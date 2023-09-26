import fs from "fs";

const fileContent = "I am fresh and young";
const filePath = "./src/fs/files/fresh.txt";
const filesFolder = "./src/fs/files";

const createFile = () => {
    // если папки "files" вдруг нет - надо ее создать
    fs.access(filesFolder, fs.constants.F_OK, (err) => {
        if (err) {
            fs.mkdir(filesFolder, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
    });

    // если файл "fresh.txt" уже существует - создаем ошибку
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
            const error = new Error("FS operation failed");
            console.error(error.message);
            return;
        }

        fs.writeFile(filePath, fileContent, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`The file has been successfully created and is located at: ${filePath}`);
        });
    });
};

createFile();

export default createFile;
