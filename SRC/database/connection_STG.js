
const admin = require('firebase-admin');




admin.initializeApp({
    credential: admin.credential.cert('../key.json'),
    storageBucket: "primera-app-6e0c4.appspot.com"
});



const bucket = admin.storage().bucket();

/**
 * This function upload file in a Firebase Bucket Storage.
 * 
 * @param {String} path  Location File <Obligatory>
 * @param {String} nameFile  <obligatory>
 * @param {String} directoryDestiny  name directory remote  <optional>
 * @returns {Boolean} result operation
 */
async function uploadFile(path, nameFile, directoryDestiny) {
    try {
        if (path !== undefined && nameFile !== undefined) {
            await bucket.upload(path, {
                destination: directoryDestiny + nameFile,
                private: true
            });
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Error Upload File, CAUSE:" + error);
        return false;
    }
};


/**
 * This Function Donwload File Selected in the remote Bucket
 * 
 * Example remote directory: dir/dir2 or / or "nameDir"
 * 
 * @param {String} nameFile <Obligatory>
 * @param {String} remoteDirectory  <Obligatory>
 * @param {String} directoryDestiny <Optional> this is the path Local in the server 
 */
async function downloadFile(nameFile, remoteDirectory, directoryDestiny) {
    try {
        if (!directoryDestiny) {
            directoryDestiny = __dirname;
        }
        await bucket.file(remoteDirectory + '/' + nameFile).download({ destination: directoryDestiny + '/' + nameFile });
    } catch (error) {
        console.log(error);
    }
};



/**
 * This function get List Files of a remote Directory or TotalBucket
 * @param {String} remoteDirectory  <optional> 
 * @returns {Array} listFiles 
 */
async function ListFiles(remoteDirectory) {
    try {
        let [listFiles] = await bucket.getFiles({
            directory: remoteDirectory
        });

        return listFiles;

    } catch (error) {
        console.log('Error en List Files CAUSE:' + error);
    }
};





/**
 * This function will found a File in the Bucket
 * @param {String} nameFile  <Obligatory>
 * @param {String} remoteDirectory <Optional>
 * @returns {Object} File 
 */
async function getFile(nameFile, remoteDirectory) {
    try {
        if (!nameFile) {
            return null;
        } else {


            let listFiles = await ListFiles(remoteDirectory);

            let rel = listFiles.map(element => {

                let nameElement = element.metadata.name;

                let numberR = nameElement.search(nameFile);

                if (numberR > 0) {

                    return element;
                }
            }).filter(data => {
                if (data) {
                    return data;
                }
            });
            return rel[0];

        }
    } catch (error) {
        console.log('Error getFile CAUSE: ' + error);
    }
};



/**
 * This Function print and get array file names of the Bucket or Directory Bucket
 * 
 * Name = DIRECTORY / NameFile.type
 * 
 * 
 * @param {String} remoteDirectory <Optional>
 * @returns {Array} listNames <String>
 */
async function toStringBucket(remoteDirectory) {
    try {
        let listFiles = await ListFiles(remoteDirectory);
        console.log('**Directory ' + '-' + ' NameFile***');
        let listNames = listFiles.map(element => {
            let nameL = element.metadata.name;
            console.log(nameL);
            return nameL;
        });
        return listNames;
    } catch (error) {
        console.log('Error toStringBucket CAUSE:' + error);
    }
};


/**
 * This Function  Delete File in the Bukect
 * @param {String} nameFile <Obligatory>
 * @param {String} remoteDirectory  <Obligatory>
 * @returns {Boolean} result operation
 */

async function DeleteFile(nameFile, remoteDirectory){
try {
    if(!nameFile){
     return false;
    }else{
    await bucket.file(remoteDirectory+'/'+nameFile).delete();
    return true;    
}
} catch (error) {
    console.log('Error DeleteFile CAUSE: '+error);
    return false;
}
};




module.exports = {
    uploadFile,
    downloadFile,
    toStringBucket,
    getFile,
    ListFiles,
    DeleteFile
};





