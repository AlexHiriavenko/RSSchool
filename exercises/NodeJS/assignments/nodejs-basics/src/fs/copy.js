import fs from "fs";
import path from "path";

const filesFolder = "./src/fs/files";
const filesCopyFolder = "./src/fs/files_copy";

const copyFiles = async () => {
    try {
        // check the conditions for those tasks before creating a folder and copying files
        const isFilesFolderExist = await fs.promises
            .access(filesFolder, fs.constants.F_OK)
            .then(() => true)
            .catch(() => false);
        const isFilesCopyFolderExist = await fs.promises
            .access(filesCopyFolder, fs.constants.F_OK)
            .then(() => true)
            .catch(() => false);

        // if folder "files" is not exist or folder files_copy has already exist - Error
        if (!isFilesFolderExist || isFilesCopyFolderExist) {
            throw new Error("FS operation failed");
        }

        // create folder "files_copy"
        await fs.promises.mkdir(filesCopyFolder);

        // содержимое папки "files"
        const contentFilesFolder = await fs.promises.readdir(filesFolder);

        // copy all files from "files" to "files_copy"
        const copyPromises = contentFilesFolder.map(async (file) => {
            const sourcePath = path.join(filesFolder, file);
            const targetPath = path.join(filesCopyFolder, file);
            await fs.promises.copyFile(sourcePath, targetPath);
        });

        await Promise.all(copyPromises);

        console.log(`Files have been successfully copied. See here: ${filesCopyFolder}`);
    } catch (err) {
        console.error(err.message);
    }
};

copyFiles();

export default copyFiles;
