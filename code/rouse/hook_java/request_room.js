function inspectObject(obj) {
    Java.perform(function () {
        const Class = Java.use("java.lang.Class");
        const obj_class = Java.cast(obj.getClass(), Class);
        const fields = obj_class.getDeclaredFields();
        const methods = obj_class.getMethods();
        console.log("Inspecting " + obj.getClass().toString());
        console.log("\tFields:");
        for (var i in fields) {
            // console.log("\t\t" + fields[i].toString());
            var className = obj_class.toString().trim().split(" ")[1];
            // console.log("className is => ",className);
            var fieldName = fields[i].toString().split(className.concat(".")).pop();
            console.log(fieldName + " => ", obj[fieldName].value);
        }
        // console.log("\tMethods:");
        // for (var i in methods)
        //     console.log("\t\t" + methods[i].toString());
    })
}


function hookROOMinfo() {
    Java.perform(function () {
        var JSON = Java.use("com.alibaba.fastjson.JSON")
        var gson = Java.use("com.google.gson.Gson").$new();
        var App_get_videoActModel = Java.use("com.fanwe.live.model.App_get_videoActModel");

        Java.use("com.fanwe.live.business.LiveBusiness$2").onSuccess.implementation = function (resp) {
            console.log("Enter LiveBusiness$2 ... ", resp)
            var result = resp.getDecryptedResult();
            var resultVideoModel = JSON.parseObject(result, App_get_videoActModel.class);
            var roomDetail = Java.cast(resultVideoModel, App_get_videoActModel);
            console.log("room id is => ", roomDetail.getRoom_id());
            inspectObject(roomDetail);
            return this.onSuccess(resp);
        }

        Java.use("com.fanwe.live.LiveInformation").getRoomId.implementation = function () {
            console.log("calling com.fanwe.live.activity.room.LiveActivity.getRoomId ...")
            return 1379212;
        }
    })

}


function invoke() {

    Java.perform(function () {
        Java.choose("com.fanwe.live.business.LiveBusiness", {
            onMatch: function (ins) {
                console.log("found ins => ", ins)
                // ins.requestData();
            }, onComplete: function () {
                console.log("Search completed!")
            }
        })
    })
}


function invoke2() {
    Java.perform(function () {

        // com.fanwe.live.business.LiveBusiness(ILiveActivity);
        var ILiveActivity = Java.use("com.fanwe.live.activity.room.ILiveActivity");

        const ILiveActivityImpl = Java.registerClass({
            name: 'com.fanwe.live.activity.room.ILiveActivityImpl',
            implements: [ILiveActivity],
            methods: {
                openSendMsg() {
                },
                getCreaterId() {
                },
                getGroupId() {
                },
                getRoomId() {
                },
                getRoomInfo() {
                },
                getSdkType() {
                },
                isAuctioning() {
                },
                isCreater() {
                },
                isPlayback() {
                },
                isPrivate() {
                }
            }
        });

        var result = Java.use("com.fanwe.live.business.LiveBusiness").$new(ILiveActivityImpl.$new());
        console.log("result is => ", result.requestRoomInfo("123454"))
    })
}

var LiveBusiness = null;
console.log("LiveBusiness is => ", LiveBusiness)

function hook3() {
    Java.perform(function () {
        Java.use("com.fanwe.live.business.LiveBusiness").getLiveQualityData.implementation = function () {
            LiveBusiness = this;
            console.log("now LiveBusiness is => ", LiveBusiness)
            LiveBusiness.requestRoomInfo("12343");
            var result = this.getLiveQualityData()
            return result;
        }
    })
}

function invoke3() {
    Java.perform(function () {
        var result = LiveBusiness.requestRoomInfo("12343");
        console.log("result is => ", result)
    })
}

function invoke4() {
    Java.perform(function () {

        // com.fanwe.live.business.LiveBusiness(ILiveActivity);
        var ILiveActivity = Java.use("com.fanwe.live.activity.room.ILiveActivity");

        const ILiveActivityImpl = Java.registerClass({
            name: 'com.fanwe.live.activity.room.ILiveActivityImpl',
            implements: [ILiveActivity],
            methods: {
                openSendMsg() {
                },
                getCreaterId() {
                },
                getGroupId() {
                },
                getRoomId() {
                },
                getRoomInfo() {
                },
                getSdkType() {
                },
                isAuctioning() {
                },
                isCreater() {
                },
                isPlayback() {
                },
                isPrivate() {
                }
            }
        });

        var LB = Java.use("com.fanwe.live.business.LiveBusiness").$new(ILiveActivityImpl.$new());

        var LB2 = Java.use("com.fanwe.live.business.LiveBusiness$2");
        var AppRequestCallback = Java.use('com.fanwe.hybrid.http.AppRequestCallback');
        Java.use("com.fanwe.live.common.CommonInterface").requestRoomInfo(1377894, 123, "1234", Java.cast(LB2.$new(LB), AppRequestCallback));
    })
}


function main() {
    hookROOMinfo();
    hook3();
}

setImmediate(main)
