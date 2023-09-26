import fs from "fs";

const fileToRead = "./src/fs/files/fileToRead.txt";

const printFileContent = async () => {
    try {
        const isFileExist = await fs.promises
            .access(fileToRead, fs.constants.F_OK)
            .then(() => true)
            .catch(() => false);

        if (!isFileExist) {
            throw new Error("FS operation failed: File: fileToRead.txt, does not exist");
        }

        const fileContent = await fs.promises.readFile(fileToRead, "utf-8");
        console.log(fileContent);
    } catch (err) {
        console.error(err.message);
    }
};

printFileContent();

export default printFileContent;
