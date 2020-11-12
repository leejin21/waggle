// TODO 아직 아래 정리 안함
// USE:: auth screens: register, terms and conditions
//    :: settings screens: coupon, edit info

import React from "react";
import AWS from "aws-sdk/dist/aws-sdk-react-native";
// import fs from "fs";
import ApiUrls from '../constants/ApiUrls';

const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';
const access_key = ApiUrls.AWS_ACCESS_KEY;
const secret_key = ApiUrls.AWS_SECRET_KEY;

const S3 = new AWS.S3({
    endpoint: endpoint,
    region: region,
    credentials: {
        accessKeyId : access_key,
        secretAccessKey: secret_key
    }
});

const bucket_name = 'waggle-thumbnail';
const local_file_path = '../assets/images/thumbnails/'+object_name;

// logic code
// TODO 비공개에서 async로 그냥 이미지 가져오는 방법 없는 지 알아보기
const downloadThumbnails = async (object_name) => {
    console.log("함수 진입 확인")
    let outStream = fs.createWriteStream(local_file_path);
    let inStream = await S3.getObject({
        Bucket: bucket_name,
        Key: object_name+'./jpg'
    }).createReadStream();

    await inStream.pipe(outStream);
    await inStream.on('end', () => {
        console.log("Download Done");
    });
};


export { downloadThumbnails };
