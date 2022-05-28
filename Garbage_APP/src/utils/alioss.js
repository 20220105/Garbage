var OSS = require("ali-oss")

export function client() {
  var client = new OSS({
    Region: "华东2（上海）",
    region: "oss-cn-shanghai",
    Endpoint: "oss-cn-shanghai",
    //   region: 'oss.shanci.tech',
    accessKeyId: "LTAI5t72XWixQmNQQe1kd3a1",
    accessKeySecret: "Zo2OJomGKnQvSmX62MX8afSVGf2inR",
    bucket: "gcss",
  }) //后端提供数据
  return client
}
