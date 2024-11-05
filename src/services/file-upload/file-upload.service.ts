import { BadRequestException, Injectable, HttpStatus } from '@nestjs/common';
import { ResponseData } from 'types/response';
import {responseValue, responseValueWithData, } from 'utils/response';


@Injectable()
export class FileUploadService {
    async handleFileUpload(file:Express.Multer.File):Promise<ResponseData>{
        try{
            if(!file){
                return responseValue(false, HttpStatus.NOT_FOUND,"File Not Found")
            }

            const allowedMimeTypes=["image/jpeg","image/png","application/pdf"];
            if(!allowedMimeTypes.includes(file.mimetype)){
                return responseValue(false,HttpStatus.CONFLICT, "Invalid File Type");
            }

            const maxSize= 5 * 1024 * 1024;
            if(file.size > maxSize){
                return responseValue(false,HttpStatus.CONFLICT, "File is too large!");
            }

            return responseValueWithData(true, HttpStatus.OK, "File uploaded successfully", { data: file.path });
        }catch(error){
            return responseValue(false, HttpStatus.CONFLICT, error.message);
        }
    }
}
