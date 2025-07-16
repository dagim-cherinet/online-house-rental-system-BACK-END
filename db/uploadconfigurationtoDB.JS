//     async uploadConfigurationToDB({ label, configuration, branch_id }) {
//     // const { branch_id, label, configuration } = configurationDetail;
//     console.log("uploading configuration to DB");
//     try {
//         // Ensure connection exists
//         if (!connection) {
//             throw new Error("Database connection not established");
//         }
//         //I can say response but i am expecting insert ID
//         console.log({ label, configuration, branch_id });
//         const response = await new Promise((resolve, reject) => {
//             const query = ` INSERT INTO router_configurations (label, configuration, branch_id )
//                 VALUES(?, ?, ?)`;

//             connection.execute(query, [label || 'Unnamed Config', configuration, branch_id]);
//         });
//         return response;
//     } catch (err) {
//         console.log(err);
//     }
// }