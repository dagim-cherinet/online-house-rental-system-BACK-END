require("dotenv").config();
const mysql = require("mysql2/promise"); // Changed to mysql2 with promise support
const branchesData = require("../JSON_DATAS/branch_info.js")
const contactsData = require("../JSON_DATAS/contact_info.js")
let instance = null;
let connection = null;

// Immediately invoked async function to create connection at module load time
(async function initializeConnection() {
    try {
        connection = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            port: process.env.DB_PORT,
            database: process.env.DATABASE,
            multipleStatements: true,
        });

        console.log("database is connected");
    } catch (err) {
        console.log("Connection error:", err.message);
    }
})();

class DbServices {
    static getDbServiceInstance() {
        return instance ? instance : new DbServices();
    }

    async getAllBranches() {
        try {
            // Ensure connection exists
            if (!connection) {
                throw new Error("Database connection not established");
            }
            const query_schema = `SELECT JSON_OBJECT(
    'branches', JSON_ARRAYAGG(
        JSON_OBJECT(
            'SN', COALESCE(b.b_id),  -- Static value (adjust if it’s a column)
            'Branch Name', COALESCE(b.b_name, 'Unknown'),
            'Connection Type', COALESCE(b.connection_type, 'Unknown'),
            'Service No.', COALESCE(b.service_no, 0),
            'Account No', COALESCE(b.account_no, 'N/A'),
            'WAN Address', COALESCE(b.wan_address, '0.0.0.0'),
            'LAN Address', COALESCE(b.lan_address, '0.0.0.0'),
            'Tunnel IP DR-ER11', COALESCE(b.tunnel_ip_dr_er11, 'N/A'),
            'Tunnel IP DR-ER12', COALESCE(b.tunnel_ip_dr_er12, 'N/A'),
            'Tunnel IP DC-ER21', COALESCE(b.tunnel_ip_dc_er21, 'N/A'),
            'Tunnel IP DC-ER22', COALESCE(b.tunnel_ip_dc_er22, 'N/A'),
            'District', 'Hawassa',  -- Static value from schema
            'branchId', COALESCE(b.b_id),  -- Format as BR001
            'branchName', COALESCE(b.b_name, 'Unknown Branch'),
            'address', SUBSTRING_INDEX(COALESCE(b.b_name, 'Unknown Branch'), ' ', 1),
            'city', SUBSTRING_INDEX(COALESCE(b.b_name, 'Unknown Branch'), ' ', 1), 
            'region', 'Sidama',       -- Static default from schema
            'phone', '+251-461-123001', -- Static default from schema
            'email', 'branch@cbe.com.et', -- Static default from schema
            'workingHours', 'Monday-Friday: 8:30 AM - 4:30 PM', -- Static from schema
            'ipAddresses', JSON_OBJECT(
                'wanIp', COALESCE(b.wan_address, '10.208.224.1'),  -- Schema default
                'lanIp', COALESCE(b.lan_address, '192.168.1.1'),    -- Schema default
                'subnetMask', '255.255.255.0',                     -- Static from schema
                'gateway', '10.208.224.254'                        -- Static from schema
            ),
            'contactPersons', JSON_OBJECT(
                'manager', COALESCE((
                    SELECT JSON_OBJECT(
                        'name', COALESCE(cp1.contact_person, 'Abebe Tadesse'),
                        'phone', COALESCE(CONCAT('+251-', cp1.phone_number), '+251-911-123001'),
                        'email', 'abebe.tadesse@cbe.com.et',  -- Static from schema
                        'office', 'Main Building, 2nd Floor'  -- Static from schema
                    )
                    FROM contact_person cp1
                    WHERE cp1.branch_id = b.b_id AND cp1.role LIKE '%Manager%'
                    LIMIT 1
                ), JSON_OBJECT(
                    'name', 'Abebe Tadesse',
                    'phone', '+251-911-123001',
                    'email', 'abebe.tadesse@cbe.com.et',
                    'office', 'Main Building, 2nd Floor'
                )),
                'operationManager', COALESCE((
                    SELECT JSON_OBJECT(
                        'name', COALESCE(cp2.contact_person, 'Tigist Bekele'),
                        'phone', COALESCE(CONCAT('+251-', cp2.phone_number), '+251-911-654001'),
                        'email', 'tigist.bekele@cbe.com.et',  -- Static from schema
                        'office', 'Operations Area, Ground Floor'  -- Static from schema
                    )
                    FROM contact_person cp2
                    WHERE cp2.branch_id = b.b_id AND cp2.role LIKE '%Operation%'
                    LIMIT 1
                ), JSON_OBJECT(
                    'name', 'Tigist Bekele',
                    'phone', '+251-911-654001',
                    'email', 'tigist.bekele@cbe.com.et',
                    'office', 'Operations Area, Ground Floor'
                ))
            ),
            'atms', JSON_ARRAY(
                JSON_OBJECT(
                    'atmId', 'AHW00001',
                    'atmName', COALESCE(CONCAT( b.b_name,' Branch ATM 1'), 'ATM 1'),
                    'location', 'Main Entrance',
                    'status', 'active',
                    'type', 'Cash Withdrawal & Deposit',
                    'ipAddress', '192.168.1.10',
                    'hardware', JSON_OBJECT(
                        'processor', 'Intel Core i5',
                        'memory', '8GB RAM',
                        'storage', '500GB SSD'
                    ),
                    'software', JSON_OBJECT(
                        'os', 'Windows 10 IoT Enterprise',
                        'atmSoftware', 'NCR APTRA'
                    ),
                    'network', JSON_OBJECT(
                        'ip', '192.168.1.10',
                        'subnet', '255.255.255.0',
                        'gateway', '192.168.1.1'
                    )
                )
            )
        )
    )
) AS result
FROM branches b;`          // Use the promise-based API with await
            const query = "SELECT * FROM contact_person";
            const [rows] = await connection.execute(query_schema);
            // console.log(rows);
            return rows;
        } catch (error) {
            console.log(error);
            throw error; // Re-throw for proper handling upstream
        }
    }

    async populateDB(branches_detail) {

        try {
            const branchQuery = `
                           INSERT INTO branches (
                           b_id, b_name, connection_type, service_no, account_no, wan_address,
                           lan_address, tunnel_ip_dr_er11, tunnel_ip_dr_er12, 
                           tunnel_ip_dc_er21, tunnel_ip_dc_er22
                           ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            for (const branch of branchesData) {
                connection.execute(branchQuery, [
                    branch.b_id,
                    branch.b_name,
                    branch.connection_type,
                    branch.service_no,
                    "no data",
                    branch.wan_address,
                    branch.lan_address,
                    branch.tunnel_ip_dr_er11,
                    branch.tunnel_ip_dr_er12,
                    branch.tunnel_ip_dc_er21,
                    branch.tunnel_ip_dc_er22,

                ]);
                console.log(`Inserted branch: ${branch.b_name}`);
            }

            // Insert contacts
            const contactQuery = `
                   INSERT INTO contact_person (
                    c_id, phone_number, contact_person, branch, role, branch_id
                    ) VALUES (?, ?, ?, ?, ?, ?) `;

            for (const contact of contactsData) {
                connection.execute(contactQuery, [
                    contact.c_id,
                    contact.phone_number,
                    contact.contact_person,
                    contact.branch,
                    contact.role,
                    contact.branch_id
                ]);
                console.log(`Inserted contact: ${contact.contact_person}`);
            }

            console.log('Database population completed successfully');
        } catch (error) {
            console.error("Error populating database:", error);
            throw error; // Re-throw for proper handling upstream   

        }



    }

    async addBranch(branch_detail) {
        const {
            b_name,
            connection_type,
            service_no,
            account_no,
            wan_address,
            lan_address,
            tunnel_ip_dr_er11,
            tunnel_ip_dr_er12,
            tunnel_ip_dc_er21,
            tunnel_ip_dc_er22,
        } = branch_detail;
        try {
            //I can say response but i am expecting insert ID
            const response = await new Promise((resolve, reject) => {
                const query = ` INSERT INTO branches (b_id,
                           b_name, 
                           connection_type, 
                           service_no, 
                           account_no,
                           wan_address, 
                           lan_address, 
                           tunnel_ip_dr_er11, 
                           tunnel_ip_dr_er12, 
                           tunnel_ip_dc_er21, 
                           tunnel_ip_dc_er22, 
                           account_no
                           )
                VALUES('${b_name}',
                '${connection_type}',
                '${service_no}',
                '${account_no}',
                '${wan_address}',
                '${lan_address}' ,
                '${tunnel_ip_dc_er21}',
                '${tunnel_ip_dc_er22}',
                '${tunnel_ip_dr_er11}',
                '${tunnel_ip_dr_er12}'
                 `;
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            //  console.log(insertId);
            return response;
        } catch (err) {
            console.log(err);
        }
    }


}

// Create the singleton instance
instance = new DbServices();

module.exports = DbServices;