// 加载express模块
const express = require('express')

// 加载mysql模块
const mysql = require('mysql')

// 加载bodyParser模块
const bodyParser = require('body-parser')

// 加载MD5模块
const md5 = require('md5')

// 加载多连接模块,用来解析接口传递的数据的
const multipart = require('connect-multiparty')
const multipartMiddleWare = multipart()

// 加载图片验证码模块
const svgCaptcha = require('svg-captcha')

// 创建mysql连接池
const pool = mysql.createPool({
  host: '127.0.0.1', //MySQL服务器地址
  port: 3306, //MySQL服务器端口号
  user: 'root', //数据库用户的用户名
  password: '', //数据库用户密码  //重要的事情  ************每个人从git上面更新代码之后先将这里的密码改成自己数据库的密码  每个人从git上面更新代码之后先将这里的密码改成自己数据库的密码  每个人从git上面更新代码之后先将这里的密码改成自己数据库的密码    重要的事情说三遍
  database: 'garbage_sorting', //数据库名称
  connectionLimit: 20, //最大连接数
  charset: 'utf8', //数据库服务器的编码方式
})

// 创建服务器对象
const server = express()

// 创建路由对象
const router = express.Router()

server.use(express.json())
server.use(
  bodyParser.urlencoded({
    extended: false,
  })
)

// 使用Cors模块,用于解决跨域问题
const cors = require('cors')

// 使用cors中间件
server.use(
  cors({
    origin: [
      'http://localhost:8080',
      'http://127.0.0.1:8080',
      'http://localhost:8081',
      'http://127.0.0.1:8081',
      'http://localhost:8082',
      'http://127.0.0.1:8082',
      'http://localhost:8083',
      'http://127.0.0.1:8083',
      'http://localhost:8084',
      'http://127.0.0.1:8084',
      'http://localhost:8085',
      'http://127.0.0.1:8085',
    ],
  })
)

// 图片验证码接口
server.get('/svg', (req, res) => {
  // 设置字母随机验证码相关属性
  let options = {
    size: 4, // 4个字母
    noise: 2, // 干扰线2条
    color: true, // 文字颜色
    background: '#666', // 背景颜色
    // 数字的时候，设置下面属性。最大，最小，加或者减
    // mathMin: 1,
    // mathMax: 30,
    // mathOperator: "-"
  }

  // let captcha = svgCaptcha.create(options) //字母和数字随机验证码
  let captcha = svgCaptcha.createMathExpr(options) //数字随机验证码

  let { text, data } = captcha
  // console.log(text,data);
  // text是指产生的验证码，data指svg的一长串的信息
  res.type('svg')
  res.send({ img: captcha.data, str: captcha.text })
})

// 阿里云视觉智能开放平台 图像识别 垃圾分类
// 引入图像识别中的垃圾分类识别
const Core = require('@alicloud/pop-core')

server.post('/gcs', (req, res, next) => {
  var client = new Core({
    accessKeyId: 'LTAI5t72XWixQmNQQe1kd3a1',
    accessKeySecret: 'Zo2OJomGKnQvSmX62MX8afSVGf2inR',
    // securityToken: '<your-sts-token>', // use STS Token
    endpoint: 'https://imagerecog.cn-shanghai.aliyuncs.com',
    apiVersion: '2019-09-30',
  })
  let imgUrl = req.body.imgUrl
  var params = {
    ImageURL: imgUrl,
  }

  var requestOption = {
    method: 'POST',
  }

  client.request('ClassifyingRubbish', params, requestOption).then(
    ress => {
      // console.log(JSON.stringify(ress))
      res.send({
        message: '识别成功',
        code: 200,
        results: ress,
      })
    },
    err => {
      // console.log(err)
      res.send({ message: '识别失败', code: 201, results: err })
      return
    }
  )
})

// 阿里云短信服务
// 加载阿里云短信服务模块
const SMSClient = require('@alicloud/sms-sdk')
//这里的url模块用来获取前端的手机号码
const url = require('url')
const { NULL } = require('mysql/lib/protocol/constants/types')

// 产生6位随机数(用来生成短信验证码的)
function getCode() {
  let str = ''
  for (let i = 0; i < 6; i++) {
    str += parseInt(Math.random() * 10)
  }
  return str
}
// 根据手机号获取短信验证码
// http://localhost:3000/get_sms
server.post('/get_sms', function (req, res, next) {
  let phoneNum = req.body.phone //获取前端参数phone
  console.log('手机号码', phoneNum)

  //初始化sms_client
  let smsClient = new SMSClient({
    accessKeyId: 'LTAI5tDyXi7VK3DgbyCXPRkr', //accessKeyId 前面提到要准备的
    secretAccessKey: 'k0svqcKyezfySP4CfiQrTmLGj5f4Kl', //secretAccessKey 前面提到要准备的
  })

  // 调用6位随机数方法
  let str = getCode()

  // 开始发送短信
  smsClient
    .sendSMS({
      PhoneNumbers: phoneNum,
      SignName: 'sign****', //签名名称 前面提到要准备的
      TemplateCode: 'SMS_**********', //模版CODE  前面提到要准备的
      TemplateParam: `{"code":'${str}'}`, // 短信模板变量对应的实际值，JSON格式
    })
    .then(result => {
      console.log('result', result)
      let { Code } = result
      if (Code == 'OK') {
        res.json({
          code: 0,
          msg: 'success',
          sms: str,
        })
        console.log(result)
      }
    })
    .catch(err => {
      console.log(err)
      res.json({
        code: 1,
        msg: 'fail: ' + err.data.Message,
      })
    })
})

server.post('/register', multipartMiddleWare, (req, res) => {
  //console.log(md5('123456'));
  //获取用户名和密码信息
  let client_name = req.body.client_name
  let client_pwd = req.body.client_pwd
  let nickname = req.body.nickname
  let client_phone = req.body.client_phone
  //以client_name为条件进行查询操作,以保证用户名的唯一性
  let sql =
    'SELECT COUNT(client_id) AS count FROM clent_users where client_name=?'
  pool.query(sql, [client_name], (error, results) => {
    if (error) throw error
    let count = results[0].count
    if (count == 0) {
      // 将用户的相关信息插入到数据表
      sql = `INSERT clent_users(client_name,client_pwd,nickname,client_phone,client_head_url) VALUES(?,MD5(?),?,?,?)`
      pool.query(
        sql,
        [
          client_name,
          client_pwd,
          nickname,
          client_phone,
          '/head_portrait/011.jpg',
        ],
        (error, result) => {
          if (error) throw error
          res.send({ message: 'ok', code: 200 })
        }
      )
    } else {
      res.send({ message: 'user exists', code: 201 })
    }
  })
})
server.post('/login', (req, res) => {
  //获取用户名和密码信息
  let client_name = req.body.client_name
  let client_pwd = req.body.client_pwd
  let nickname = req.body.nickname
  let id = req.body.id
  let url = req.body.url
  let sql =
    'SELECT client_id,client_name,nickname,client_head_url from clent_users where client_name=? AND client_pwd=MD5(?)'
  pool.query(
    sql,
    [client_name, client_pwd, nickname, id, url],
    (error, results) => {
      if (results.length == 0) {
        //登录失败
        if (error) throw error
        res.send({ mesage: 'login failed', code: 201 })
      } else {
        res.send({ meessage: 'ok', code: 200, result: results[0] })
      }
    }
  )
})

// 用户排行榜查询
server.get('/rankingList/:page/:pageNum', (req, res) => {
  let page = req.params.page * 1 //page从前端接收过来的页码
  let pageNum = req.params.pageNum * 1 //pageNum从前端接收过来的每页显示的条数
  let sql =
    'SELECT nickname,money_amoun,client_head_url,integral FROM `clent_users` ORDER BY money_amoun DESC limit ?,?'
  pool.query(sql, [(page - 1) * 6, pageNum], (err, results) => {
    if (err) {
      res.send({ message: 'fault', code: 203 })
    } else {
      res.send({ message: 'success', code: 200, results: results })
    }
  })
})

// 预估重量查询
server.get('/estimateWeight', (req, res) => {
  let sql = 'SELECT * FROM weight'
  pool.query(sql, (err, results) => {
    if (err) {
      res.send({ message: 'SQL Error', code: 500 })
    } else {
      res.send({ message: 'success', code: 200, results })
    }
  })
})

//回收分类查询
server.get('/sortChoice', (req, res) => {
  let sql = 'SELECT * FROM sort_ choice'
  pool.query(sql, (err, results) => {
    if (err) {
      res.send({ message: 'SQL Error', code: 500 })
    } else {
      res.send({ message: 'success', code: 200, results })
    }
  })
})

// 根据查询垃圾的类别及其类别的所有数据
server.get('/search_garbageClass/:garbageName', (req, res) => {
  let garbage = req.params.garbageName //从前端接收过来的要查询的垃圾
  let sql =
    'select * from garbage_classes WHERE garbage_class_id=(select garbage_class_id from garbage where garbage_name= ? );'
  pool.query(sql, [garbage], (err, results) => {
    if (err) {
      res.send({ message: 'fault', code: 201 })
    } else {
      res.send({ message: 'success', code: 200, result: results[0] })
    }
  })
})

// 查询所有垃圾的数据
server.get('/getGarbages', (req, res) => {
  let sql =
    'select g.garbage_id,g.garbage_name,g.garbage_remark,gc.garbage_class_name from garbage g INNER JOIN garbage_classes gc on g.garbage_class_id=gc.garbage_class_id'
  pool.query(sql, (err, results) => {
    if (err) {
      res.send({ message: 'fault', code: 201 })
    } else {
      res.send({ message: 'success', code: 200, results: results })
    }
  })
})

// 模糊搜索查询垃圾
server.get('/searchGarbage/:search', (req, res) => {
  let search = req.params.search
  // console.log(search)
  let sql =
    'select g.garbage_id,g.garbage_name,g.garbage_remark,gc.garbage_class_name from garbage g INNER JOIN garbage_classes gc on g.garbage_class_id=gc.garbage_class_id where garbage_name like ?'
  pool.query(sql, ['%' + search + '%'], (err, results) => {
    if (err) {
      res.send({ message: 'fault', code: 201 })
    } else {
      res.send({ message: 'success', code: 200, results: results })
    }
  })
})

// 添加垃圾
server.get(
  '/addGarbage/:garbageName/:garbageClassId/:garbageRemark',
  (req, res) => {
    let garbageName = req.params.garbageName
    let garbageClassId = req.params.garbageClassId
    let garbageRemark = req.params.garbageRemark

    //以garbage_name为条件进行查找操作，以保证垃圾关键词的唯一性
    let sql =
      'SELECT count(garbage_id) as count from garbage where garbage_name=?'
    pool.query(sql, [garbageName], (error, results) => {
      let count = results[0].count
      if (count == 0) {
        sql =
          'INSERt into garbage (garbage_name,garbage_class_id,garbage_remark) values (?,?,?)'
        pool.query(
          sql,
          [garbageName, garbageClassId, garbageRemark],
          (err, results) => {
            if (err) {
              res.send({ message: 'fault', code: 201 })
            } else {
              console.log(res)
              res.send({ message: 'success', code: 200, results: results })
            }
          }
        )
      } else {
        res.send({ message: '关键词重复插入', code: 202 })
      }
    })
  }
)

// 删除多个垃圾
server.post('/deleteGarbages', (req, res) => {
  let ids = req.body.garbageIds
  ids = ids.split(',').map(Number)
  ids = eval(ids)
  console.log(ids)
  let sql = `DELETE from garbage where garbage_id in (?)`
  // console.log(ids)
  pool.query(sql, [ids], (err, results) => {
    console.log(results)
    if (err) {
      res.send({ message: '删除失败', code: 201 })
    } else {
      if (results.affectedRows == 0) {
        return res.send({ message: '没有选中任何数据', code: 202 })
      }
      res.send({ message: '删除成功', code: 200 })
    }
  })
})

// 修改垃圾
server.get(
  '/updateGarbage/:garbage_id/:garbage_name/:garbage_class_name/:garbage_remark',
  (req, res) => {
    let garbageId = req.params.garbage_id
    let garbageName = req.params.garbage_name
    let garbageClassId = req.params.garbage_class_name
    let garbageRemark = req.params.garbage_remark

    //以garbage_name为条件进行查找操作，以保证垃圾关键词的唯一性
    let sql =
      'SELECT count(garbage_id) as count from garbage where garbage_name=?'
    pool.query(sql, [garbageName], (error, results) => {
      let count = results[0].count
      if (count == 0) {
        sql =
          'UPDATE garbage SET garbage_name=?,garbage_class_id=?,garbage_remark=? WHERE garbage_id=?'
        pool.query(
          sql,
          [garbageName, garbageClassId, garbageRemark, garbageId],
          (err, results) => {
            if (err) {
              res.send({ message: 'fault', code: 201 })
            } else {
              console.log(res)
              res.send({ message: 'success', code: 200 })
            }
          }
        )
      } else {
        res.send({ message: '关键词重复插入', code: 202 })
      }
    })
  }
)

// 后端数据管理
server.get('/client_count', (req, res) => {
  let sql = `select count(if(money_amoun BETWEEN 0 and 1000,true,null)) as '0-1000',
  count(if(money_amoun BETWEEN 1000 and 2000,true,null)) as '1000-2000',
  count(if(money_amoun BETWEEN 2000 and 10000,true,null)) as '2000-10000',
  count(if(money_amoun BETWEEN 10000 and 20000,true,null)) as '10000-20000',
  count(if(money_amoun BETWEEN 20000 and 100000,true,null)) as '20000-100000'
  from clent_users;`
  pool.query(sql, (err, results) => {
    if (err) {
      res.send({ message: 'fault', code: 201 })
    } else {
      res.send({ message: 'success', code: 200, results: results })
    }
  })
})

// 根据用户id获取环保金部分
server.get('/money_amoun/:userId', (req, res) => {
  let userId = req.params.userId
  let sql = `select money_amoun,recycle_count,integral from clent_users where client_id=?`
  pool.query(sql, [userId], (err, results) => {
    if (err) {
      res.send({ message: 'fault', code: 201 })
    } else {
      res.send({ message: 'success', code: 200, results: results })
    }
  })
})
server.get('/feedback/:class/:phone/:feedback', (req, res) => {
  let fbClass = req.params.class
  let phone = req.params.phone
  let feedback = req.params.feedback
  // let isno=req.params.isno
  let sql = `INSERT into feedbacks (feedback_class,phone,feedback) values (?,?,?)`
  pool.query(sql, [fbClass, phone, feedback], (err, results) => {
    if (err) {
      res.send({ message: 'fault', code: 201 })
    } else {
      res.send({ message: 'success', code: 200 })
    }
  })
})

//后台用户列表 获取用户列表长度
server.get('/users', (req, res) => {
  const sql = 'SELECT * FROM clent_users'
  pool.query(sql, (error, ret) => {
    if (error) {
      return res.send({
        message: '查询失败',
        code: 500,
      })
    }
    res.send({
      data: ret.length,
      code: 200,
    })
  })
})

//后台用户列表  添加用户接口
server.post('/addUser', (req, res) => {
  let client_name = req.body.client_name
  let client_pwd = req.body.client_pwd
  let nickname = req.body.nickname
  let client_phone = req.body.client_phone
  let money_amoun = 0
  let integral = 0
  let recycle_count = 0

  //以client_name为条件进行查询操作,以保证用户名的唯一性
  let sql =
    'SELECT COUNT(client_id) AS count FROM clent_users where client_name=?'
  pool.query(sql, [client_name], (error, results) => {
    if (error) throw error
    let count = results[0].count
    if (count == 0) {
      // 将用户的相关信息插入到数据表
      sql =
        'INSERT clent_users(client_name,client_pwd,nickname,client_phone,money_amoun,integral,recycle_count) VALUES(?,MD5(?),?,?,?,?,?)'
      pool.query(
        sql,
        [
          client_name,
          client_pwd,
          nickname,
          client_phone,
          money_amoun,
          integral,
          recycle_count,
        ],
        (error, result) => {
          if (error) throw error
          res.send({
            message: 'ok',
            code: 200,
          })
        }
      )
    } else {
      res.send({
        message: 'user exists',
        code: 201,
      })
    }
  })
})

//后台用户列表   搜索用户
server.get('/searchUser/:name', (req, res) => {
  let name = req.params.name
  const sql = 'SELECT * FROM clent_users WHERE client_name = ?'
  pool.query(sql, name, (err, ret) => {
    if (err)
      return res.send({
        message: '查询失败',
        code: 500,
      })
    if (ret.length) {
      res.send({
        data: ret,
        code: 200,
      })
    } else
      res.send({
        message: '没有此用户',
        code: 201,
      })
  })
})

//后台用户列表   删除用户
server.get('/deleteUser/:id', (req, res) => {
  const id = Number(req.params.id)
  const sql = 'delete from clent_users where client_id = ?;'
  pool.query(sql, id, (err, ret) => {
    if (err) {
      console.log(err)
      return res.send({
        message: '删除失败',
        code: 500,
      })
    }
    if (ret.affectedRows === 1) {
      res.send({
        message: '删除用户成功',
        code: 200,
      })
    } else {
      return res.send({
        message: '删除用户不存在',
        code: 201,
      })
    }
  })
})

//删除多个回收员
server.post('/deleteCollectorUsers',(req,res)=>{
  let ids=req.body.collectorUsersIds;
  ids=ids.split(',').map(Number)
  ids=eval(ids)
  console.log(ids)
  let sql=`delete from collector_users where collector_id in (?)`
  pool.query(sql,[ids],(err,results)=>{
    console.log(results)
    if(err){
      res.send({message:'删除失败',code:201})
    }else{
      if(results.affectedRows==0){
        return res.send({message:'没有选中任何数据',code:202})
      }
      res.send({message:'删除成功',code:200})
    }
  })
})

//后台用户列表  编辑用户
server.post('/editUser', (req, res) => {
  let client_id = Number(req.body.client_id)
  let client_name = req.body.client_name
  let client_pwd = req.body.client_pwd
  let nickname = req.body.nickname
  let client_phone = req.body.client_phone

  //后台用户列表   查询id是否存在
  let sql =
    'SELECT COUNT(client_id) AS count FROM clent_users where client_id=?'
  pool.query(sql, [client_id], (error, results) => {
    if (error) {
      console.log(error)
      throw error
    }
    let count = results[0].count
    if (count != 0) {
      // 查询用户名是否被使用
      sql =
        'SELECT COUNT(client_name) AS count FROM clent_users where client_name=? and client_id != ?'
      pool.query(sql, [client_name, client_id], (err, ret) => {
        if (err) {
          console.log(err)
          throw err
        }
        count = ret[0].count
        if (count == 0) {
          //更新用户信息
          sql =
            'update clent_users set client_name = ?,client_pwd = ?,nickname =?,client_phone =? where client_id = ?'
          pool.query(
            sql,
            [client_name, client_pwd, nickname, client_phone, client_id],
            (error, result) => {
              if (error) throw error
              res.send({
                message: 'ok',
                code: 200,
              })
            }
          )
        } else {
          return res.send({
            message: '该用户名已经存在',
            code: 201,
          })
        }
      })
    } else {
      res.send({
        message: 'user not exists',
        code: 201,
      })
    }
  })
})

//后台用户列表   分页查询
server.post('/page', (req, res) => {
  let pageNo = Number(req.body.page) || 1
  let pageCount = Number(req.body.pageSize) || 10
  let pageSize = pageCount
  let page = (pageNo - 1) * pageCount
  console.log(page, pageSize)
  let sqlStr = `select * from clent_users limit ${page},${pageSize}`
  pool.query(sqlStr, (error, results, fields) => {
    if (error) {
      console.log(error)
      res.json({
        err_code: 500,
        message: '获取分页数据失败',
      })
    } else {
      console.log(results.length)
      res.json({
        code: 200,
        message: '获取分页数据成功',
        data: results,
      })
    }
  })
})
// 收支明细
server.get('/shouzhi/:uid/:class_id', (req, res) => {
  let uid = req.params.uid
  let class_id = req.params.class_id
  let sql = `select * from extend_details where client_id=? and extend_class=?`
  pool.query(sql, [uid, class_id], (err, results) => {
    if (err) {
      res.send({ message: 'fault', code: 201 })
    } else {
      res.send({ message: 'success', code: 200, results: results })
    }
  })
})

// 提现
server.get("/tixian/:fangshi/:price/:clientId", (req, res) => {
  let fangshi=req.params.fangshi
  let price=req.params.price
  let clientId=req.params.clientId
  let sql = `select money_amoun from clent_users where client_id=?`
  pool.query(sql,[clientId],(err, results) => {
    if (err) {
      res.send({ message: "fault", code: 201 })
    } else {
      let money=results[0].money_amoun
      // console.log(money);
      // 向收支表添加数据并且修改用户的金额余额
      // 不需要获取当前时间  数据库设计时设置的更新数据或者添加的时候
      sql=`insert into extend_details (extend_name,extend_price,client_id,extend_class) values (?,?,?,0);`
      pool.query(sql,[fangshi,price*1,clientId],(err, results) => {
        if (err) {
          res.send({ message: "fault", code: 201 })
        } else {
          // 修改用户金额
          sql=`UPDATE clent_users SET money_amoun=? WHERE client_id=?`
          pool.query(sql,[(money*1-price*1),clientId],(err, results) => {
            if (err) {
              res.send({ message: "fault", code: 201 })
            } else {
              res.send({ message: "success", code: 200, results: results })
            }
          })
        }
      })
    }
  })
})

// 修改头像
server.post("/updateHead", (req, res) => {
  let imgUrl=req.body.imgUrl
  let uid=req.body.uid
  // console.log(imgUrl);
  // console.log(uid);
  let sql = `UPDATE clent_users SET client_head_url=? WHERE client_id=?;`
  
  pool.query(sql,[imgUrl,uid],(err, results) => {
    if (err) {
      res.send({ message: "fault", code: 201 })
    } else {
      res.send({ message: "success", code: 200, results: results })
    }
  })
})

// 获取手机号
server.get("/getphone/:uid", (req, res) => {
  let uid=req.params.uid
  let sql = `select client_phone from clent_users where client_id=?`
  pool.query(sql,[uid],(err, results) => {
    if (err) {
      res.send({ message: "fault", code: 201 })
    } else {
      res.send({ message: "success", code: 200, result: results[0] })
    }
  })
})

// 个人信息修改
server.post("/updateMessage", (req, res) => {
  let nickname=req.body.nickname
  let phone=req.body.phone
  let uid=req.body.uid
  // console.log(imgUrl);
  // console.log(uid);
  let sql = `UPDATE clent_users SET nickname=?,client_phone=? WHERE client_id=?;`
  
  pool.query(sql,[nickname,phone,uid],(err, results) => {
    if (err) {
      res.send({ message: "fault", code: 201 })
    } else {
      res.send({ message: "success", code: 200, results: results })
    }
  })
})

// 查询密码是否正确
server.post("/searchPwd", (req, res) => {
  let oldPwd=req.body.oldPwd
  let uid=req.body.uid
  let sql = `select client_pwd from clent_users where client_id=?`
  pool.query(sql,[uid],(err, results) => {
    if (err) {
      res.send({ message: "fault", code: 201 })
    } else {
      if (md5(oldPwd)==results[0].client_pwd) {
        res.send({ message: "密码正确", code: 200, result: true })
      }else{
        res.send({ message: "密码错误", code: 202, result: false })
      }
    }
  })
})

// 修改密码
server.post("/updatePwd", (req, res) => {
  let newPwd=req.body.newPwd
  let uid=req.body.uid
  let sql = `update clent_users set client_pwd=MD5(?) where client_id=?`
  pool.query(sql,[newPwd,uid],(err, results) => {
    if (err) {
      res.send({ message: "fault", code: 201 })
    } else {
      res.send({ message: "success", code: 200, result: true })
    }
  })
})

// 查询状态
server.get("/getState", (req, res) => {
  let uid=req.params.uid
  let sql = `select * from state`
  pool.query(sql,(err, results) => {
    if (err) {
      res.send({ message: "fault", code: 201 })
    } else {
      res.send({ message: "success", code: 200, results: results })
    }
  })
})

// 查询订单
server.post("/search_orders", (req, res) => {
  let uid=req.body.uid
  let stateId=req.body.stateId
  let sql = "select o.order_id,o.order_num,o.client_id,o.collector_id,o.state_id,s.state_name,o.order_time,o.order_complete_time,o.w_id,w.w_range,o.sort_choice_id,sc.`sort_ choice_name` sortChoice,o.address,o.note,c.collector_name,c.collector_phone from orders o INNER JOIN collector_users c on o.collector_id=c.collector_id INNER JOIN state s on o.state_id=s.state_id INNER JOIN sort_choice sc on o.sort_choice_id=sc.`sort_ choice_id` INNER JOIN weight w on o.w_id=w.w_id where client_id=? and o.state_id like ?"
  pool.query(sql,[uid,'%'+stateId+'%'],(err, results) => {
    if (err) {
      res.send({ message: "fault", code: 201 })
    } else {
      res.send({ message: "success", code: 200, results: results })
    }
  })
})
// 回收员查询订单
server.post("/search_orders_collector", (req, res) => {
  let uid=req.body.uid
  let stateId=req.body.stateId
  let sql = "select o.order_id,o.order_num,o.client_id,o.collector_id,o.state_id,s.state_name,o.order_time,o.order_complete_time,o.w_id,w.w_range,o.sort_choice_id,sc.`sort_ choice_name` sortChoice,o.address,o.note,c.collector_name,c.collector_phone,a.address_text,a.name,a.phone,a.areaCode from orders o INNER JOIN collector_users c on o.collector_id=c.collector_id INNER JOIN state s on o.state_id=s.state_id INNER JOIN sort_choice sc on o.sort_choice_id=sc.`sort_ choice_id` INNER JOIN weight w on o.w_id=w.w_id INNER JOIN address a on o.address_id=a.address_id where o.collector_id=? and o.state_id like ?"
  pool.query(sql,[uid,'%'+stateId+'%'],(err, results) => {
    if (err) {
      res.send({ message: "fault", code: 201 })
    } else {
      res.send({ message: "success", code: 200, results: results })
    }
  })
})
// 取消订单
server.get("/cancelOrder/:orderId",(req,res)=>{
  var orderId=req.params.orderId
  let sql = `update orders set state_id=7 where order_id=?`
  pool.query(sql,[orderId],(err, results) => {
    if (err) {
      res.send({ message: "fault", code: 201 ,result:false})
    } else {
      res.send({ message: "success", code: 200, result: true })
    }
  })
})
// 订单详情
server.post("/order_details", (req, res) => {
  let orderId=req.body.orderId
  let sql = "select o.order_id,o.order_num,o.client_id,o.collector_id,o.state_id,s.state_name,o.order_time,o.order_complete_time,o.w_id,w.w_range,o.sort_choice_id,sc.`sort_ choice_name` sortChoice,o.address,o.note,c.collector_name,c.collector_phone from orders o INNER JOIN collector_users c on o.collector_id=c.collector_id INNER JOIN state s on o.state_id=s.state_id INNER JOIN sort_choice sc on o.sort_choice_id=sc.`sort_ choice_id` INNER JOIN weight w on o.w_id=w.w_id where o.order_id=?"
  pool.query(sql,[orderId],(err, results) => {
    if (err) {
      res.send({ message: "fault", code: 201 })
    } else {
      res.send({ message: "success", code: 200, result: results[0] })
    }
  })
})
// 回收员订单详情
server.post("/order_details_collector", (req, res) => {
  let orderId=req.body.orderId
  let sql = "select o.order_id,o.order_num,o.client_id,o.collector_id,o.state_id,s.state_name,o.order_time,o.order_complete_time,o.w_id,w.w_range,o.sort_choice_id,sc.`sort_ choice_name` sortChoice,o.address,o.note,c.collector_name,c.collector_phone,c.collector_num,c.collector_money,cu.money_amoun,cu.integral,cu.recycle_count,a.name,a.phone,a.areaCode from orders o INNER JOIN collector_users c on o.collector_id=c.collector_id INNER JOIN state s on o.state_id=s.state_id INNER JOIN sort_choice sc on o.sort_choice_id=sc.`sort_ choice_id` INNER JOIN weight w on o.w_id=w.w_id INNER JOIN clent_users cu on o.client_id=cu.client_id INNER JOIN address a on o.address_id=a.address_id where o.order_id=?"
  pool.query(sql,[orderId],(err, results) => {
    if (err) {
      res.send({ message: "fault", code: 201 })
    } else {
      res.send({ message: "success", code: 200, result: results[0] })
    }
  })
})

//根据collector_name查询用户信息
server.get("/v1/search/:collector_name",(req,res)=>{
  var _uname=req.params.collector_name;
  var sql="select * from collector_users where collector_name=?";
  pool.query(sql,[_uname],(err,result)=>{
    if(err) throw err;
    res.send(result[0]);
  })
})
//查询用户列表
server.get("/v1/list",(req,res)=>{
  var sql="select * from collector_users";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(result);
  })
})
//添加回收员用户
server.post('/collector_register',(req,res)=>{
  //console.log(md5('12345678'))
  //获取用户名和密码信息
  let collector_name=req.body.collector_name;
  let collector_pwd=req.body.collector_pwd;
  let collector_phone=req.body.collector_phone;
  let collector_address=req.body.collector_address;
  //以username为条件进行查找操作,以保证用户名的唯一性
  let sql='select count(collector_id) as count from collector_users where collector_name=?';
  pool.query(sql,[collector_name],(error,results)=>{
    if(error) throw error;
    let count=results[0].count;
    if(count==0){
      //将用户的相关信息插入到数据表
      sql='insert collector_users(collector_name,collector_pwd,collector_phone,collector_address) values(?,MD5(?),?,?)';

      pool.query(sql,[collector_name,collector_pwd,collector_phone,collector_address],(error,results)=>{
        if(error) throw error;
        res.send({message:'ok',code:200});
      })
    }else{
      res.send({message:'user exists',code:201});
    }
  })
})
server.post("/v1/delUser/:collector_id",(req,res)=>{
  var collector_id=req.params.collector_id;
  var sql="delete from collector_users where collector_id=?";
  pool.query(sql,[collector_id],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send("1");
    }else{
      res.send("0");
    }
  });
});

//根据collector_id修改用户信息
server.post("/v1/update",(req,res)=>{
  var obj=req.body;
  var sql="update collector_users set ? where collector_id=?";
  pool.query(sql,[obj,obj.collector_id],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send("1");
    }else{
      res.send("0");
    }
  });
});
//修改回收员
server.get('/updateCollectorUser/:collector_id/:collector_name/:collector_phone/:collector_address',(req,res)=>{
  let collectorUserId=req.params.collector_id;
  let collectorUserName=req.params.collector_name;
  let collectorUserPhone=req.params.collector_phone;
  let collectorUserAddress=req.params.collector_address;
  //以collector_name为条件进行查找操作,以保证回收员关键词的唯一性
  let sql='select count(collector_id) as count from collector_users where collector_name=?'
  pool.query(sql,[collectorUserName],(error,results)=>{
    let count=results[0].count;
    if(count==0){
      sql='update collector_users set collector_name=?,collector_phone=?,collector_address=? where collector_id=?'
      pool.query(sql,[collectorUserName,collectorUserPhone,collectorUserAddress,collectorUserId],(err,results)=>{
        if(err){
          res.send({message:'falut',code:201})
        }else{
          console.log(res)
          res.send({message:'success',code:200})
        }
      })
    }else{
      res.send({message:'关键词重复插入',code:202})
    }
  })
})
// 添加地址
server.post("/insertAddress", (req, res) => {
  let addressText=req.body.addressText
  let uid=req.body.uid
  let name=req.body.name
  let phone=req.body.phone
  let areaCode=req.body.areaCode
  let sql = "INSERT INTO address (address_text,client_id,name,phone,areaCode) values (?,?,?,?,?)"
  pool.query(sql,[addressText,uid,name,phone,areaCode],(err, results) => {
    if (err) {
      res.send({ message: "fault", code: 201 })
    } else {
      res.send({ message: "success", code: 200, result: results })
    }
  })
})
// 加载默认地址
server.post("/morenAddress", (req, res) => {
  let uid=req.body.uid
  let sql = "select * from address where address_id=(select client_address_id from clent_users where client_id=?)"
  pool.query(sql,[uid],(err, results) => {
    if (err) {
      res.send({ message: "fault", code: 201 })
    } else {
      res.send({ message: "success", code: 200, result: results[0] })
    }
  })
})
// 修改默认地址
server.post("/updateMorenAddress", (req, res) => {
  let addressId=req.body.addressId
  if(!addressId)addressId=null
  let uid=req.body.uid
  let sql = "UPDATE clent_users set client_address_id=? where client_id=?"
  pool.query(sql,[addressId,uid],(err, results) => {
    if (err) {
      res.send({ message: "fault", code: 201 })
    } else {
      res.send({ message: "success", code: 200, results: results })
    }
  })
})
// 地址查询List
server.post("/searchAddress", (req, res) => {
  let uid=req.body.uid
  let sql = "select client_address_id from clent_users where client_id=?"
  pool.query(sql,[uid],(err, results) => {
    if (err) {
      res.send({ message: "fault", code: 201 })
    } else {
      let morenId=results[0].client_address_id
      sql="select * from address where client_id=?"
      pool.query(sql,[uid],(err, results) => {
        if (err) {
          res.send({ message: "fault", code: 201 })
        } else {
          for (const i in results) {
            if(results[i].address_id==morenId){
              results[i].ismoren=true
            }else if(results[i].address_id!=morenId){
              results[i].ismoren=false
            }
          }
          res.send({ message: "success", code: 200, results: results })
        }
      })
    }
  })
})

// 修改地址
server.post("/EditAddress", (req, res) => {
  let addressText=req.body.addressText
  let name=req.body.name
  let phone=req.body.phone
  let areaCode=req.body.areaCode
  let addressID=req.body.addressID
  let sql = "update address set address_text=?,name=?,phone=?,areaCode=? where address_id=?"
  pool.query(sql,[addressText,name,phone,areaCode,addressID],(err, results) => {
    if (err) {
      res.send({ message: "fault", code: 201 })
    } else {
      if(results.affectedRows==0){
        res.send({ message: "fault", code:202})
      } 
      res.send({ message: "success", code: 200, results: results })
    }
  })
})

// 删除地址
server.post("/deleteAddress", (req, res) => {
  let addressId=req.body.addressId
  let sql = "delete from address where address_id=?"
  pool.query(sql,[addressId],(err, results) => {
    if (err) {
      res.send({ message: "fault", code: 201 })
    } else {
      res.send({ message: "success", code: 200, results: results })
    }
  })
})

// 添加订单
server.post("/EditOrder", (req, res) => {
  let orderNum=req.body.orderNum
  let uid=req.body.uid
  let collectorId=req.body.collectorId
  let orderCompleteTime=req.body.orderCompleteTime
  let wId=req.body.wId
  let sortChoiceId=req.body.sortChoiceId
  let address=req.body.address
  let addressId=req.body.addressId
  let note=req.body.note
  let sql = "insert into orders (order_num,client_id,collector_id,state_id,order_complete_time,w_id,sort_choice_id,address_id,address,note) values (?,?,?,2,?,?,?,?,?,?)"
  pool.query(sql,[orderNum,uid,collectorId,orderCompleteTime,wId,sortChoiceId,addressId,address,note],(err, results) => {
    if (err) {
      res.send({ message: "fault", code: 201 })
    } else {
      res.send({ message: "success", code: 200, results: results })
    }
  })
})

// 加载回收员
server.post("/collectorUsers", (req, res) => {
  let sql = "select * from collector_users"
  pool.query(sql,(err, results) => {
    if (err) {
      res.send({ message: "fault", code: 201 })
    } else {
      res.send({ message: "success", code: 200, results: results })
    }
  })
})

// 回收员登陆
server.post('/collectorLogin', (req, res) => {
  let phone=req.body.phone
  let pwd=req.body.pwd
  //获取用户名和密码信息
  let sql='select * from collector_users where collector_phone=? and collector_pwd=MD5(?)'
  pool.query(sql,[phone,pwd],(error, results) => {
      if (results.length == 0) {
        //登录失败
        if (error) throw error
        res.send({ mesage: 'login failed', code: 201 })
      } else {
        res.send({ meessage: 'login success', code: 200, result: results[0] })
      }
    }
  )
})

// 回收员注册
server.post('/collectorRegister', (req, res) => {
  //获取用户名和密码信息
  let name = req.body.name
  let phone = req.body.phone
  let pwd = req.body.pwd
  //以client_name为条件进行查询操作,以保证用户名的唯一性
  let sql =
    'SELECT COUNT(collector_id) AS count FROM collector_users where collector_phone=?'
  pool.query(sql, [phone], (error, results) => {
    if (error) throw error
    else{
      let count = results[0].count
      if (count == 0) {
        // 将用户的相关信息插入到数据表
        sql = `INSERT collector_users(collector_name,collector_phone,collector_pwd,collector_address) VALUES(?,?,MD5(?),'海淀区')`
        pool.query(sql,[name,phone,pwd],(error, result) => {
            if (error) throw error
            res.send({ message: 'ok', code: 200 })
          }
        )
      } else {
        res.send({ message: '手机号重复', code: 201 })
      }
    }
  })
})

// 根据回收员id查询信息
server.post("/collectorMoneyNum", (req, res) => {
  let cid=req.body.cid
  let sql = "select * from collector_users where collector_id=?"
  pool.query(sql,[cid],(err, results) => {
    if (err) {
      res.send({ message: "fault", code: 201 })
    } else {
      res.send({ message: "success", code: 200, results: results })
    }
  })
})

// 修改订单状态
server.post("/insertState", (req, res) => {
  let stateId=req.body.stateId
  let orderId=req.body.orderId
  let sql = "update orders set state_id=? where order_id=?"
  pool.query(sql,[stateId,orderId],(err, results) => {
    if (err) {
      res.send({ message: "fault", code: 201 })
    } else {
      res.send({ message: "success", code: 200, results: results })
    }
  })
})

// 修改回收员金额单量以及用户金额积分回收次数
server.post("/updateMoneyNum", (req, res) => {
  let cid=req.body.cid
  let cmoney=req.body.cmoney
  let cnum=req.body.cnum

  let uid=req.body.uid
  let umoney=req.body.umoney
  let uintegral=req.body.uintegral
  let unum=req.body.unum

  umoney=Number(umoney)
  let sql = "update clent_users set money_amoun=?,integral=?,recycle_count=? where client_id=?"
  pool.query(sql,[umoney,uintegral,unum,uid],(err, results) => {
    if (err) {
      res.send({ message: "fault", code: 201 })
    } else {
      sql="update collector_users set collector_money=?,collector_num=? where collector_id=?"
      pool.query(sql,[cmoney,cnum,cid],(err, results) => {
        if (err) {
          res.send({ message: "fault", code: 202 })
        } else {
          res.send({ message: "success", code: 200 })
        }
      })
    }
  })
})

// 添加收支明细
server.get("/tianjiashouru/:fangshi/:price/:clientId", (req, res) => {
  let fangshi=req.params.fangshi
  let price=req.params.price
  let clientId=req.params.clientId
  // console.log(price);
  let sql = `select money_amoun from clent_users where client_id=?`
  pool.query(sql,[clientId],(err, results) => {
    if (err) {
      res.send({ message: "fault", code: 201 })
    } else {
      let money=results[0].money_amoun
      // console.log(money);
      // console.log(money);
      // 向收支表添加数据并且修改用户的金额余额
      // 不需要获取当前时间  数据库设计时设置的更新数据或者添加的时候
      sql=`insert into extend_details (extend_name,extend_price,client_id,extend_class) values (?,?,?,1);`
      pool.query(sql,[fangshi,price*1,clientId],(err, results) => {
        if (err) {
          res.send({ message: "fault", code: 201 })
        } else {
          // 修改用户金额
          sql=`UPDATE clent_users SET money_amoun=? WHERE client_id=?`
          pool.query(sql,[money*1,clientId],(err, results) => {
            if (err) {
              res.send({ message: "fault", code: 201 })
            } else {
              res.send({ message: "success", code: 200, results: results })
            }
          })
        }
      })
    }
  })
})

// 后端管理员登陆接口
server.post("/adminlogin",(req,res)=>{
  // 获取管理员的账号密码
  let adminname=req.body.adminname
  let adminword=req.body.adminword
  let sql=
   "select admin_name,admin_pwd,admin_id from admin_users where admin_name=? and admin_pwd=MD5(?)"
   pool.query(sql,[adminname,adminword],(err,results)=>{
     if(err)throw err
     if(results.length==0){
      //  登陆失败
      res.send({
        message:"登陆失败",
        code:201
      })
     }else {
      res.send({
        message:"登陆成功",
        code:200,
        result:results[0]
      })
     }
   })
})

// 指定服务器对象监听的端口
server.listen(3000, () => {
  console.log('服务器启动成功...')
})