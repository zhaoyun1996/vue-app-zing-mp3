let request = require('request-promise');
const encrypt = require('./encrypt');

const API_KEY = '38e8643fb0dc04e8d65b99994d3dafff';
const SERCRET_KEY = '10a01dcf33762d3a204cb96429918ff6';
const URL_API = [
    'https://zingmp3.vn/api',
    'https://beta.zingmp3.vn'
];

request = request.defaults({
    qs: {
        api_key: API_KEY,
        apiKey: API_KEY
    },
    gzip: true,
    json: true
});

class ZingMp3 {

    // static getFullInfo(id){
    //     return new Promise(async(resolve, reject) => {
    //         try {
    //             const data = await Promise.all([this.getSongInfo(id), this.getStreaming(id)]);
    //             const infoSong = data[0].data;
    //             let res = {
    //                 id,
    //                 title: infoSong.title,
    //                 artists_names: infoSong.artists_names,
    //                 thumbnail: infoSong.thumbnail_medium,
    //                 lyric: infoSong.lyric,
    //                 streaming: data[1].data
    //             };
    //             resolve(res);
    //         } catch (error) {
    //             reject(error);
    //         }
    //     });
    // }

    // static getInfoDetail(id) {
    //     return new Promise(async (resolve, reject) => {
    //         const option = {
    //             nameAPI: '/song/get-song-detail',
    //             typeApi: 0,
    //             qs: {
    //                 id
    //             },
    //             param: 'id=' + id
    //         };

    //         try {
    //             const data = await this.requestZing(option);
    //             if (data.err) reject(data);
    //             resolve(data);
    //         } catch (error) {
    //             reject(error);
    //         }
    //     })
    // }

    // static getSongInfo(id) {
    //     return new Promise(async (resolve, reject) => {

    //         const option = {
    //             nameAPI: '/song/get-song-info',
    //             typeApi: 0,
    //             qs: {
    //                 id
    //             },
    //             param: 'id=' + id
    //         };

    //         try {
    //             const data = await this.requestZing(option);
    //             if (data.err) reject(data);
    //             resolve(data);
    //         } catch (error) {
    //             reject(error);
    //         }
    //     })
    // }

    // static getStreaming(id) {
    //     return new Promise(async (resolve, reject) => {

    //         const option = {
    //             nameAPI: '/api/v2/song/getStreaming',
    //             typeApi: 1,
    //             qs: {
    //                 id
    //             },
    //             param: 'id=' + id
    //         };

    //         try {
    //             const data = await this.requestZing(option);
    //             if (data.err) reject(data);
    //             resolve(data);
    //         } catch (error) {
    //             reject(error);
    //         }
    //     })
    // }

    static requestZing({nameAPI, typeApi, param, qs})
    {
        
        let sig = this.hashParam(nameAPI, param);
        return request({
            uri: URL_API[typeApi] + nameAPI,
            qs: {
                ctime: this.time,
                sig,
                ...qs
            }
        });
    }

    static hashParam(nameAPI, param = '')
    {
        this.time = Math.floor(Date.now() / 1000);
        const hash256 = encrypt.getHash256(`ctime=${this.time}${param}`);
        return encrypt.getHmac512(nameAPI + hash256, SERCRET_KEY);
    }

    static getFullInfo1(id){
        const 
            nameAPI = '/song/get-song-detail',
            typeApi = 0,
            qs = {
                id
            },
            param = 'id=' + id;

        let sig = this.hashParam(nameAPI, param);
        return request({
            uri: URL_API[typeApi] + nameAPI,
            qs: {
                ctime: this.time,
                sig,
                ...qs
            }
        });
    }

    // static getRandomJoke(){
    //     return new Promise((resolve, reject) => {
    //       const request = new XMLHttpRequest();
      
    //       request.open('GET', 'https://zingmp3.vn/api/song/get-song-detail?api_key=38e8643fb0dc04e8d65b99994d3dafff&apiKey=38e8643fb0dc04e8d65b99994d3dafff&ctime=1607187315&sig=127ac4dcde3884b179c2fe28abccbf695c231e25a2fe88c038ae026698d4dc14aa63f91eab075e4beae2dba88e7b23a63fdd9f6626d572e84d69ca4b7f3bdc60&id=ZWEIUAIF');
    //       request.onload = () => {
    //         if (request.status === 200) {
    //           resolve(request.response); // we got data here, so resolve the Promise
    //         } else {
    //           reject(Error(request.statusText)); // status is not 200 OK, so reject
    //         }
    //       };
      
    //       request.onerror = () => {
    //         reject(Error('Error fetching data.')); // error occurred, reject the  Promise
    //       };
      
    //       request.send(); // send the request
    //     });
    //   }
}

module.exports = ZingMp3;