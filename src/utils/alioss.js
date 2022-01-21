var OSS = require("ali-oss")

export function client() {
  var client = new OSS({
    Region: "华东2（上海）",
    region: "oss-cn-shanghai",
    Endpoint: "oss-cn-shanghai",
    //   region: 'oss.shanci.tech',
    accessKeyId: "LTAI5tS13hLMaCDwSKKuN44j",
    accessKeySecret: "ZWDBGptxteeghariGFiYF13FcVgP4m",
    bucket: "gcss",
  }) //后端提供数据
  return client
}
