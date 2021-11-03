import {
    requestGet,
    requestPost
} from "../../utils/request";
const app = getApp()

Page({
        data: {

        },
        onLoad() {
            this.getyiqingdata();
            this.getnews();
        },
        async getyiqingdata() {
            const result = await requestGet("http://api.tianapi.com/ncov/index?key=5d206a0670dfbaf479318be06a186026");
            var nowquezhen = result.newslist[0].desc.currentConfirmedCount
            var wuzhengzhuang = result.newslist[0].desc.seriousCount
            var xinzengzhiyu = result.newslist[0].desc.curedIncr
            var xinzengsiwang = result.newslist[0].desc.deadIncr
            var leijiquezhen = result.newslist[0].desc.confirmedCount
            var jingwai = result.newslist[0].desc.suspectedCount
            var leijizhiyu = result.newslist[0].desc.curedCount
            var leijisiwang = result.newslist[0].desc.deadCount

            this.setData({
                xyqz: nowquezhen,
                wzz: wuzhengzhuang,
                xzzy: xinzengzhiyu,
                xzsw: xinzengsiwang,
                ljqz: leijiquezhen,
                jwsr: jingwai,
                ljzy: leijizhiyu,
                ljsw: leijisiwang
            });
        },
        async getnews() {
            const result2 = await requestPost("https://wechat.wecity.qq.com/api/THPneumoniaOuterDataService/getLocalCase", { "args": { "req": {} }, "service": "THPneumoniaOuterDataService", "func": "getLocalCase", "context": { "userId": "947dda43995f4c8aa571e5476174b821", "channel": "AAGE4DTdkWHeoYS3T0Y8o3ZV" } });
            var result3 = result2.args.rsp.infos;
            this.setData({
                newsdata: result3
            })
        }
    },

)