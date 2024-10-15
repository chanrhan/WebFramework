
export const FileUtils = {
    encodeFileToBase64 : async (fileList: Array<File>)=>{
        const encodingFiles = fileList.map((file)=>{
            const reader = new FileReader();
            reader.readAsDataURL(file)
            return new Promise((resolve)=>{
                reader.onload = ()=>{
                    resolve(reader.result)
                }
            })
        });

        return await Promise.all(encodingFiles);
    },
    handleFilesInput: async (currFiles: Array, orgFiles: Array, maxFileCount)=>{
        if(orgFiles && orgFiles.length){
            const fileLength = orgFiles.length;
            if(fileLength > 0){
                // const currFiles = fileInputField.input.filter(v=>v.preview)
                const orgLength = currFiles.length;
                const files = [...orgFiles].slice(0, Math.min(5 - orgLength, fileLength))
                const convertFiles = await FileUtils.encodeFileToBase64(files);
                let arr = [...currFiles];
                for(const index in convertFiles){
                    arr.push({
                        file: files[index],
                        preview: convertFiles[index]
                    })
                }

                if(orgLength + fileLength < maxFileCount){
                    // 추가
                    arr.push({
                        file: null,
                        preview: null
                    })
                }
                return arr;
            }
        }
        return null;
    }
}
