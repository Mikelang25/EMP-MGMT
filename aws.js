
module.exports = {

    create: function (employee) {
        // Load the AWS SDK for Node.js
        const AWS = require('aws-sdk');

        const bucketName = "emp-mgt-" + employee
        // Create S3 service object
        s3 = new AWS.S3({ apiVersion: '2006-03-01' });
        // call S3 to create the bucket
        s3.createBucket({ Bucket: bucketName }, function (err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", data.Location);
            }
        });

    },
    upload: function (selectedFile,employeeID) {
        console.log("getting to aws upload")
        var AWS = require('aws-sdk');
        // Create S3 service object
        s3 = new AWS.S3({ apiVersion: '2006-03-01' });
        const bucketName = "emp-mgt-" + employeeID;
        var file = selectedFile.data;
        var fileName = selectedFile.name
        // call S3 to retrieve upload file to specified bucket
        var uploadParams = { Bucket: bucketName, Key: fileName, Body: file, ACL : 'public-read' };

        console.log("getting to aws upload 2")
        // call S3 to retrieve upload file to specified bucket
        s3.upload(uploadParams, function (err, data) {
            if (err) {
                console.log("Error", err);
            } if (data) {
                console.log("Upload Success", data.Location);
            }
        });
    },
    download: function (selectedFile,employeeID){
        
    }
}



