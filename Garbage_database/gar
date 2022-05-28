/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 100119
 Source Host           : localhost:3306
 Source Schema         : garbage_sorting

 Target Server Type    : MySQL
 Target Server Version : 100119
 File Encoding         : 65001

 Date: 06/02/2022 03:43:41
*/

SET NAMES utf8mb4;
DROP DATABASE IF EXISTS `garbage_sorting`;
CREATE DATABASE garbage_sorting;
SET FOREIGN_KEY_CHECKS = 0;
USE garbage_sorting;
DROP TABLE IF EXISTS `sort_ choice`;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address`  (
  `address_id` int NOT NULL AUTO_INCREMENT COMMENT '地址id',
  `address_text` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '地址内容',
  `client_id` int NOT NULL COMMENT '地址对应的用户',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '收货人姓名',
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '收货人电话',
  `areaCode` varchar(6) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '邮政编码',
  PRIMARY KEY (`address_id`) USING BTREE,
  INDEX `client_id`(`client_id`) USING BTREE,
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clent_users` (`client_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 33 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES (1, '北京啊', 1, '张三里斯', '17600000000', '110101');
INSERT INTO `address` VALUES (14, '北京市昌平区沙河镇于辛庄村中心街2号(村委会院内) 昌平区沙河镇于辛庄村村委会', 1, '张吉祥', '17634100864', '110114');
INSERT INTO `address` VALUES (16, '北京市海淀区万寿路西路2号文博大厦2层北侧 达内北京万寿路中心', 1, '张吉祥', '17634100864', '110108');
INSERT INTO `address` VALUES (17, '北京市海淀区万寿路西路2号文博大厦2层北侧 达内北京万寿路中心', 1, '霞', '17634100864', '110108');
INSERT INTO `address` VALUES (18, '北京市海淀区万寿路西路2号文博大厦2层北侧 达内北京万寿路中心', 1, '霞', '17634100864', '110108');
INSERT INTO `address` VALUES (21, '北京市海淀区万寿路西路2号文博大厦2层北侧 达内北京万寿路中心', 1, '张三', '17600000000', '110108');
INSERT INTO `address` VALUES (22, '北京市海淀区万寿路西路2号文博大厦2层北侧 达内北京万寿路中心', 2, '赵子龙', '17634100000', '110108');
INSERT INTO `address` VALUES (23, '北京市昌平区沙河镇于辛庄村中心街2号(村委会院内) 昌平区沙河镇于辛庄村村委会', 2, '释宽海', '17600000000', '110114');
INSERT INTO `address` VALUES (24, '北京市海淀区万寿路西路2号文博大厦2层北侧 达内北京万寿路中心', 2, '赵子龙', '17600000000', '110108');
INSERT INTO `address` VALUES (25, '北京市海淀区万寿路西路2号文博大厦2层北侧 达内北京万寿路中心', 2, '赵', '17600000000', '110108');
INSERT INTO `address` VALUES (31, '北京市海淀区万寿路西路2号文博大厦二层北侧 达内IT培训(万寿路校区)', 1, 'zhangjixiang', '17688888888', '110108');

-- ----------------------------
-- Table structure for admin_users
-- ----------------------------
DROP TABLE IF EXISTS `admin_users`;
CREATE TABLE `admin_users`  (
  `admin_id` int NOT NULL AUTO_INCREMENT COMMENT '管理员id',
  `admin_name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '管理员账号',
  `admin_pwd` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '管理员密码',
  PRIMARY KEY (`admin_id`) USING BTREE,
  UNIQUE INDEX `admin_id`(`admin_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of admin_users
-- ----------------------------
INSERT INTO `admin_users` VALUES (2, '诸葛亮', 'e10adc3949ba59abbe56e057f20f883e');
INSERT INTO `admin_users` VALUES (3, '周瑜', 'e10adc3949ba59abbe56e057f20f883e');
INSERT INTO `admin_users` VALUES (4, '司马懿', 'e10adc3949ba59abbe56e057f20f883e');

-- ----------------------------
-- Table structure for clent_users
-- ----------------------------
DROP TABLE IF EXISTS `clent_users`;
CREATE TABLE `clent_users`  (
  `client_id` int NOT NULL AUTO_INCREMENT COMMENT '客户端用户id',
  `nickname` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '客户端用户的昵称',
  `client_name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '客户端用户名',
  `client_pwd` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '客户端用户的登录密码',
  `client_phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '客户端用户的手机号',
  `client_address_id` int NULL DEFAULT NULL COMMENT '客户端用户的默认地址对应的id',
  `money_amoun` decimal(16, 2) NOT NULL COMMENT '客户端用户的环保金额',
  `integral` decimal(16, 2) NOT NULL COMMENT '客户端用户的积分',
  `recycle_count` decimal(16, 0) NOT NULL COMMENT '客户端用户回收的次数',
  `client_head_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '客户端用户的头像url地址',
  PRIMARY KEY (`client_id`) USING BTREE,
  UNIQUE INDEX `client_id`(`client_id`) USING BTREE,
  INDEX `client_address_id`(`client_address_id`) USING BTREE,
  CONSTRAINT `clent_users_ibfk_1` FOREIGN KEY (`client_address_id`) REFERENCES `address` (`address_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of clent_users
-- ----------------------------
INSERT INTO `clent_users` VALUES (1, '霞我的最爱', 'zhangjixiang', '8c5f83180b573621723f9013974f6b50', '17634100864', 31, 142.11, 153.00, 2, 'http://gcss.oss-cn-shanghai.aliyuncs.com/1644079779000856SSzhJMfnKac6aC3WKn6b7rcfrSX23.jpg');
INSERT INTO `clent_users` VALUES (2, '常山赵子龙', 'zhaozilong', 'e10adc3949ba59abbe56e057f20f883e', '18515400057', 25, 806.11, 1256.00, 0, '/head_portrait/002.jpg');
INSERT INTO `clent_users` VALUES (3, '派大星', 'xiaer', 'e10adc3949ba59abbe56e057f20f883e', '13750615009', NULL, 1243.11, 1243.00, 0, '/head_portrait/003.jpg');
INSERT INTO `clent_users` VALUES (4, 'Nil', 'zhumingxiao', 'e10adc3949ba59abbe56e057f20f883e', '15156339687', NULL, 45.15, 45.00, 0, '/head_portrait/004.jpg');
INSERT INTO `clent_users` VALUES (5, '命运观测者', 'zhangchao', 'e10adc3949ba59abbe56e057f20f883e', '17634010869', NULL, 12.99, 12.00, 0, '/head_portrait/005.jpg');
INSERT INTO `clent_users` VALUES (6, '耳东陈', 'chendandan', 'e10adc3949ba59abbe56e057f20f883e', '13845679852', NULL, 54.00, 54.00, 0, '/head_portrait/006.jpg');
INSERT INTO `clent_users` VALUES (7, '百事可乐', 'zongbangwu', 'e10adc3949ba59abbe56e057f20f883e', '13545678542', NULL, 0.00, 0.00, 0, '/head_portrait/007.jpg');
INSERT INTO `clent_users` VALUES (8, '!', 'sunanju', 'e10adc3949ba59abbe56e057f20f883e', '17634200864', NULL, 6.00, 6.00, 0, '/head_portrait/008.jpg');
INSERT INTO `clent_users` VALUES (9, '。', 'baizichuan', 'e10adc3949ba59abbe56e057f20f883e', '17632100864', NULL, 91592.65, 95642.00, 0, 'http://gcss.oss-cn-shanghai.aliyuncs.com/16432212000007QcacmF4wzERQ36McdGCbWs4SeJJeaKC.jpg');
INSERT INTO `clent_users` VALUES (10, '.', 'chenchen', 'e10adc3949ba59abbe56e057f20f883e', '17624100864', NULL, 14567.69, 4567.00, 0, '/head_portrait/010.jpg');
INSERT INTO `clent_users` VALUES (11, '绝世大帅哥', 'zjxzjx', 'e10adc3949ba59abbe56e057f20f883e', '17634100865', NULL, 0.00, 0.00, 0, '/head_portrait/011.jpg');
INSERT INTO `clent_users` VALUES (12, '是陈世美啊', 'zjxzjxzjx', 'e10adc3949ba59abbe56e057f20f883e', '17634100864', NULL, 0.00, 0.00, 0, '/head_portrait/011.jpg');
INSERT INTO `clent_users` VALUES (13, '陈某爱美女', 'chenhaochenhao', 'e10adc3949ba59abbe56e057f20f883e', '17635555555', NULL, 0.00, 0.00, 0, '/head_portrait/011.jpg');
INSERT INTO `clent_users` VALUES (14, '安居桑', 'sunanjusunanju', 'e10adc3949ba59abbe56e057f20f883e', '17634100000', NULL, 0.00, 0.00, 0, '/head_portrait/011.jpg');
INSERT INTO `clent_users` VALUES (15, '123456', 'zhangsan', 'e10adc3949ba59abbe56e057f20f883e', '17634100001', NULL, 0.00, 0.00, 0, '/head_portrait/011.jpg');
INSERT INTO `clent_users` VALUES (16, '我是李四', 'lisilisi', 'e10adc3949ba59abbe56e057f20f883e', '17634100000', NULL, 0.00, 0.00, 0, '/head_portrait/011.jpg');
INSERT INTO `clent_users` VALUES (17, '我是王五', 'wangwu', 'e10adc3949ba59abbe56e057f20f883e', '17634100004', NULL, 0.00, 0.00, 0, '/head_portrait/011.jpg');
INSERT INTO `clent_users` VALUES (18, '我是赵六啊', 'zhaoliu', 'e10adc3949ba59abbe56e057f20f883e', '17634100860', NULL, 0.00, 0.00, 0, '/head_portrait/011.jpg');
INSERT INTO `clent_users` VALUES (19, '我要巡山', 'woshidawang', '3d15b7c754ff93cdc26c3994465b2dd7', '17634100009', NULL, 0.00, 0.00, 0, '/head_portrait/011.jpg');

-- ----------------------------
-- Table structure for collector_users
-- ----------------------------
DROP TABLE IF EXISTS `collector_users`;
CREATE TABLE `collector_users`  (
  `collector_id` int NOT NULL AUTO_INCREMENT COMMENT '回收员id',
  `collector_name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '回收员姓名',
  `collector_pwd` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '回收员登录密码',
  `collector_phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '回收员的手机号,即登录账号',
  `collector_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '回收员所负责的区域',
  `collector_money` decimal(10, 2) NOT NULL COMMENT '回收员的账户收入',
  `collector_num` decimal(11, 0) NOT NULL COMMENT '回收员的回收单量',
  PRIMARY KEY (`collector_id`) USING BTREE,
  UNIQUE INDEX `collector_id`(`collector_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of collector_users
-- ----------------------------
INSERT INTO `collector_users` VALUES (1, '司马懿', 'e10adc3949ba59abbe56e057f20f883e', '17634100864', '海淀区', 100.11, 5);
INSERT INTO `collector_users` VALUES (2, '曹操', 'e10adc3949ba59abbe56e057f20f883e', '18515400056', '海淀区', 106.11, 7);
INSERT INTO `collector_users` VALUES (3, '李信', 'e10adc3949ba59abbe56e057f20f883e', '17634100865', '昌平区', 201.11, 6);
INSERT INTO `collector_users` VALUES (4, '张三', 'e10adc3949ba59abbe56e057f20f883e', '17600000000', '海淀区', 100.11, 5);
INSERT INTO `collector_users` VALUES (5, '李四', 'e10adc3949ba59abbe56e057f20f883e', '17611111111', '海淀区', 100.11, 4);
INSERT INTO `collector_users` VALUES (6, '王五', 'e10adc3949ba59abbe56e057f20f883e', '17622222222', '海淀区', 100.11, 3);
INSERT INTO `collector_users` VALUES (7, '赵六', 'e10adc3949ba59abbe56e057f20f883e', '17633333333', '海淀区', 201.11, 5);
INSERT INTO `collector_users` VALUES (8, '孙琦', 'e10adc3949ba59abbe56e057f20f883e', '17644444444', '海淀区', 201.11, 4);
INSERT INTO `collector_users` VALUES (9, '奥特曼', 'e10adc3949ba59abbe56e057f20f883e', '17655555555', '海淀区', 201.11, 15);

-- ----------------------------
-- Table structure for extend_details
-- ----------------------------
DROP TABLE IF EXISTS `extend_details`;
CREATE TABLE `extend_details`  (
  `extend_id` int NOT NULL AUTO_INCREMENT COMMENT '收支明细的id',
  `extend_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '收支明细的款项',
  `extend_price` decimal(10, 2) NOT NULL COMMENT '收支的金额',
  `extend_data` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '收支金额转出日期',
  `client_id` int NOT NULL COMMENT '收支金额对应用户的id',
  `extend_class` int NOT NULL COMMENT '0代表支出,1代表收入',
  PRIMARY KEY (`extend_id`) USING BTREE,
  INDEX `client_id`(`client_id`) USING BTREE,
  CONSTRAINT `extend_details_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clent_users` (`client_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 43 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of extend_details
-- ----------------------------
INSERT INTO `extend_details` VALUES (1, '回收成功', 100.00, '2022-01-24 14:01:39.000000', 2, 1);
INSERT INTO `extend_details` VALUES (2, '回收成功', 111.00, '2022-01-12 14:01:06.000000', 2, 1);
INSERT INTO `extend_details` VALUES (4, '购买商品', 100.00, '2022-01-14 14:01:59.000000', 2, 0);
INSERT INTO `extend_details` VALUES (7, '购买商品', 100.00, '2022-01-21 14:02:33.000000', 2, 0);
INSERT INTO `extend_details` VALUES (8, '微信零钱提现', 100.00, '2022-01-25 13:34:36.253710', 2, 0);
INSERT INTO `extend_details` VALUES (9, '微信零钱提现', 100.00, '2022-01-25 13:34:35.653968', 2, 0);
INSERT INTO `extend_details` VALUES (10, '微信零钱提现', 100.00, '2022-01-25 13:34:34.979772', 2, 0);
INSERT INTO `extend_details` VALUES (11, '微信零钱提现', 100.00, '2022-01-25 13:34:34.370902', 2, 0);
INSERT INTO `extend_details` VALUES (13, '微信零钱提现', 50.00, '2022-01-25 13:34:33.041460', 2, 0);
INSERT INTO `extend_details` VALUES (14, '微信零钱提现', 100.00, '2022-01-25 13:34:32.229581', 2, 0);
INSERT INTO `extend_details` VALUES (15, '银行卡提现', 50.00, '2022-01-25 13:34:52.060816', 2, 0);
INSERT INTO `extend_details` VALUES (17, '银行卡提现', 50.00, '2022-01-25 13:34:51.361686', 2, 0);
INSERT INTO `extend_details` VALUES (18, '银行卡提现', 1000.00, '2022-01-25 13:34:50.571798', 9, 0);
INSERT INTO `extend_details` VALUES (19, '微信零钱提现', 50.00, '2022-01-25 13:34:31.182284', 9, 0);
INSERT INTO `extend_details` VALUES (20, '银行卡提现', 50.00, '2022-01-25 13:34:49.596407', 9, 0);
INSERT INTO `extend_details` VALUES (21, '银行卡提现', 50.00, '2022-01-25 13:34:48.937275', 9, 0);
INSERT INTO `extend_details` VALUES (22, '微信零钱提现', 1000.00, '2022-01-25 13:34:30.268716', 9, 0);
INSERT INTO `extend_details` VALUES (23, '微信零钱提现', 50.00, '2022-01-25 13:34:29.635821', 2, 0);
INSERT INTO `extend_details` VALUES (24, '微信零钱提现', 50.00, '2022-01-25 13:34:29.093269', 2, 0);
INSERT INTO `extend_details` VALUES (25, '微信零钱提现', 50.00, '2022-01-25 13:34:28.552660', 10, 0);
INSERT INTO `extend_details` VALUES (26, '微信零钱提现', 50.00, '2022-01-25 13:34:28.002603', 18, 0);
INSERT INTO `extend_details` VALUES (27, '微信零钱提现', 50.00, '2022-01-25 13:34:27.435165', 18, 0);
INSERT INTO `extend_details` VALUES (28, '微信零钱提现', 50.00, '2022-01-25 13:34:26.899735', 18, 0);
INSERT INTO `extend_details` VALUES (29, '微信零钱提现', 50.00, '2022-01-25 13:34:26.340249', 18, 0);
INSERT INTO `extend_details` VALUES (30, '微信零钱提现', 50.00, '2022-01-25 13:34:25.778275', 18, 0);
INSERT INTO `extend_details` VALUES (31, '微信零钱提现', 50.00, '2022-01-25 13:34:25.212321', 18, 0);
INSERT INTO `extend_details` VALUES (32, '微信零钱提现', 756.11, '2022-01-25 13:34:24.668774', 18, 0);
INSERT INTO `extend_details` VALUES (33, '微信零钱提现', 50.00, '2022-01-25 13:34:24.083315', 18, 0);
INSERT INTO `extend_details` VALUES (34, '微信零钱提现', 1000.00, '2022-01-25 13:34:18.360858', 9, 0);
INSERT INTO `extend_details` VALUES (35, '银行卡提现', 1000.00, '2022-01-25 13:34:12.161113', 9, 0);
INSERT INTO `extend_details` VALUES (36, '银行卡提现', 2000.00, '2022-01-25 13:29:45.720018', 9, 0);
INSERT INTO `extend_details` VALUES (37, '银行卡提现', 50.00, '2022-01-25 13:33:16.942279', 9, 0);
INSERT INTO `extend_details` VALUES (38, '微信零钱提现', 1.00, '2022-01-29 21:37:43.197144', 1, 0);
INSERT INTO `extend_details` VALUES (41, '微信零钱提现', 100.00, '2022-02-02 22:45:58.000000', 1, 0);
INSERT INTO `extend_details` VALUES (42, '微信零钱提现', 10.00, '2022-02-06 00:41:03.677201', 1, 0);

-- ----------------------------
-- Table structure for feedbacks
-- ----------------------------
DROP TABLE IF EXISTS `feedbacks`;
CREATE TABLE `feedbacks`  (
  `feedback_id` int NOT NULL AUTO_INCREMENT COMMENT '意见id',
  `feedback` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '意见内容',
  `feedback_isno` int NOT NULL COMMENT '意见是否被采纳,1表示采纳,0表示不采纳',
  `feedback_class` int NOT NULL COMMENT '反馈类型,1表示投诉,0表示建议',
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '电话号',
  PRIMARY KEY (`feedback_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of feedbacks
-- ----------------------------
INSERT INTO `feedbacks` VALUES (1, '没有啥子意见', 1, 0, '17634100864');
INSERT INTO `feedbacks` VALUES (2, '垃圾分类垃圾分类垃圾分类垃圾分类', 0, 0, '17634100864');
INSERT INTO `feedbacks` VALUES (3, '垃圾分类垃圾分类垃圾分类垃圾分类', 0, 0, '17634100864');
INSERT INTO `feedbacks` VALUES (4, '垃圾分类垃圾分类垃圾分类垃圾分类', 0, 0, '17634100864');
INSERT INTO `feedbacks` VALUES (5, '垃圾分类垃圾分类垃圾分类垃圾分类', 0, 1, '17634100864');
INSERT INTO `feedbacks` VALUES (6, '测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用', 0, 1, '17634100864');
INSERT INTO `feedbacks` VALUES (7, '测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用', 0, 1, '17634100864');
INSERT INTO `feedbacks` VALUES (8, '测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用', 0, 0, '17634100864');
INSERT INTO `feedbacks` VALUES (9, '1234567894351657啊是大飒飒飒飒飒飒飒飒飒飒飒飒飒飒飒飒', 0, 1, '17634100864');
INSERT INTO `feedbacks` VALUES (10, '撒顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶', 0, 0, '17634100864');
INSERT INTO `feedbacks` VALUES (11, '阿三顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶', 0, 1, '17634100864');

-- ----------------------------
-- Table structure for garbage
-- ----------------------------
DROP TABLE IF EXISTS `garbage`;
CREATE TABLE `garbage`  (
  `garbage_id` int NOT NULL AUTO_INCREMENT COMMENT '垃圾id',
  `garbage_name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '垃圾的名称',
  `garbage_class_id` int NOT NULL COMMENT '垃圾对应的类别id',
  `garbage_remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '垃圾对应的备注',
  PRIMARY KEY (`garbage_id`) USING BTREE,
  UNIQUE INDEX `garbage_id`(`garbage_id`) USING BTREE,
  INDEX `garbage_class_id`(`garbage_class_id`) USING BTREE,
  CONSTRAINT `garbage_ibfk_1` FOREIGN KEY (`garbage_class_id`) REFERENCES `garbage_classes` (`garbage_class_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 126 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of garbage
-- ----------------------------
INSERT INTO `garbage` VALUES (1, '打印机', 1, '电器电子产品类');
INSERT INTO `garbage` VALUES (2, '宣传单', 1, '纸张');
INSERT INTO `garbage` VALUES (3, '废弃计算机', 1, '电器电子产品类');
INSERT INTO `garbage` VALUES (4, '复印件\r\n复印件', 1, '电器电子产品类');
INSERT INTO `garbage` VALUES (5, '扫描仪', 1, '电器电子产品类');
INSERT INTO `garbage` VALUES (6, '投影仪', 1, '电器电子产品类');
INSERT INTO `garbage` VALUES (7, '电视机', 1, '电器电子产品类');
INSERT INTO `garbage` VALUES (8, '空调机', 1, '电器电子产品类');
INSERT INTO `garbage` VALUES (9, '报纸/复印纸', 1, '纸类');
INSERT INTO `garbage` VALUES (10, '书籍', 1, '纸类');
INSERT INTO `garbage` VALUES (11, '包装纸', 1, '纸类');
INSERT INTO `garbage` VALUES (12, '硬纸板', 1, '纸类');
INSERT INTO `garbage` VALUES (13, '纸板箱、包装盒', 1, '纸类');
INSERT INTO `garbage` VALUES (14, '牛奶包装等', 1, '纸类');
INSERT INTO `garbage` VALUES (15, '矿泉水瓶', 1, '塑料类');
INSERT INTO `garbage` VALUES (16, '硬质塑料瓶', 1, '塑料类');
INSERT INTO `garbage` VALUES (17, '塑料盒', 1, '塑料类');
INSERT INTO `garbage` VALUES (18, '塑料杯', 1, '塑料类');
INSERT INTO `garbage` VALUES (19, '塑料袋', 1, '塑料类');
INSERT INTO `garbage` VALUES (20, '保鲜袋', 1, '塑料类');
INSERT INTO `garbage` VALUES (21, '塑料泡沫', 1, '塑料类');
INSERT INTO `garbage` VALUES (22, '废弃塑料文具', 1, '塑料类');
INSERT INTO `garbage` VALUES (23, '玻璃瓶', 1, '玻璃类');
INSERT INTO `garbage` VALUES (24, '玻璃杯', 1, '玻璃类');
INSERT INTO `garbage` VALUES (25, '灯泡', 1, '玻璃类');
INSERT INTO `garbage` VALUES (26, '碎玻璃', 1, '玻璃类');
INSERT INTO `garbage` VALUES (27, '玻璃', 1, '玻璃类');
INSERT INTO `garbage` VALUES (28, '铁', 1, '金属类');
INSERT INTO `garbage` VALUES (29, '铜', 1, '金属类');
INSERT INTO `garbage` VALUES (30, '锌', 1, '金属类');
INSERT INTO `garbage` VALUES (31, '金属罐', 1, '金属类');
INSERT INTO `garbage` VALUES (32, '金属盒', 1, '金属类');
INSERT INTO `garbage` VALUES (33, '金属文件柜', 1, '金属类');
INSERT INTO `garbage` VALUES (34, '沙发', 1, '办公用品类');
INSERT INTO `garbage` VALUES (35, '茶几', 1, '办公用品类');
INSERT INTO `garbage` VALUES (36, '办公桌', 1, '办公用品类');
INSERT INTO `garbage` VALUES (37, '文件柜', 1, '办公用品类');
INSERT INTO `garbage` VALUES (38, '椅子', 1, '办公用品类');
INSERT INTO `garbage` VALUES (39, '食堂剩菜', 2, '厨房垃圾');
INSERT INTO `garbage` VALUES (40, '菜帮菜叶', 2, '厨房垃圾');
INSERT INTO `garbage` VALUES (41, '肉类鱼虾废弃部分', 2, '厨房垃圾');
INSERT INTO `garbage` VALUES (42, '剩饭', 2, '厨房垃圾');
INSERT INTO `garbage` VALUES (43, '蛋壳', 2, '厨房垃圾');
INSERT INTO `garbage` VALUES (44, '香蕉', 2, '厨房垃圾');
INSERT INTO `garbage` VALUES (45, '果皮', 2, '厨房垃圾');
INSERT INTO `garbage` VALUES (46, '苹果', 2, '厨房垃圾');
INSERT INTO `garbage` VALUES (47, '梨', 2, '厨房垃圾');
INSERT INTO `garbage` VALUES (48, '猕猴桃', 2, '厨房垃圾');
INSERT INTO `garbage` VALUES (49, '西瓜', 2, '厨房垃圾');
INSERT INTO `garbage` VALUES (50, '草莓', 2, '厨房垃圾');
INSERT INTO `garbage` VALUES (51, '白菜', 2, '厨房垃圾');
INSERT INTO `garbage` VALUES (52, '纸巾', 2, '不可降解物');
INSERT INTO `garbage` VALUES (53, '牙签', 2, '不可降解物');
INSERT INTO `garbage` VALUES (54, '普通干电池', 3, '电池类');
INSERT INTO `garbage` VALUES (55, '灰土', 3, '不可回收部分');
INSERT INTO `garbage` VALUES (56, '砖', 3, '不可回收部分');
INSERT INTO `garbage` VALUES (57, '瓦', 3, '不可回收部分');
INSERT INTO `garbage` VALUES (58, '陶瓷', 3, '不可回收部分');
INSERT INTO `garbage` VALUES (59, '其它混合垃圾', 3, '不可回收部分');
INSERT INTO `garbage` VALUES (60, '纺织品', 3, '不可回收部分');
INSERT INTO `garbage` VALUES (61, '木料', 3, '不可回收部分');
INSERT INTO `garbage` VALUES (62, '竹子', 3, '不可回收部分');
INSERT INTO `garbage` VALUES (63, '拖把', 3, '不可回收部分');
INSERT INTO `garbage` VALUES (64, '抹布', 3, '不可回收部分');
INSERT INTO `garbage` VALUES (65, '牙签', 3, '不可回收部分');
INSERT INTO `garbage` VALUES (66, '一次性筷子', 3, '不可回收部分');
INSERT INTO `garbage` VALUES (67, '树枝', 3, '不可回收部分');
INSERT INTO `garbage` VALUES (68, '纸类', 3, '不可回收部分');
INSERT INTO `garbage` VALUES (69, '塑料类', 3, '不可回收部分');
INSERT INTO `garbage` VALUES (70, '玻璃类', 3, '不可回收部分');
INSERT INTO `garbage` VALUES (71, '金属类', 3, '不可回收部分');
INSERT INTO `garbage` VALUES (72, '纽扣电池', 4, '电池类');
INSERT INTO `garbage` VALUES (73, '充电电池', 4, '电池类');
INSERT INTO `garbage` VALUES (74, '废荧光灯管', 4, '含汞类');
INSERT INTO `garbage` VALUES (75, '废节能灯', 4, '含汞类');
INSERT INTO `garbage` VALUES (76, '废水银温度计', 4, '含汞类');
INSERT INTO `garbage` VALUES (77, '废水银血压计', 4, '含汞类');
INSERT INTO `garbage` VALUES (78, '荧光棒等', 4, '含汞类');
INSERT INTO `garbage` VALUES (79, '过期药品', 4, '费药类');
INSERT INTO `garbage` VALUES (80, '药', 4, '费药类');
INSERT INTO `garbage` VALUES (81, '油漆', 4, '油漆、废农药类');
INSERT INTO `garbage` VALUES (82, '敌敌畏', 4, '油漆、废农药类');
INSERT INTO `garbage` VALUES (83, '百草枯', 4, '油漆、废农药类');
INSERT INTO `garbage` VALUES (84, '老鼠药', 4, '油漆、废农药类');
INSERT INTO `garbage` VALUES (85, '蟑螂药', 4, '油漆、废农药类');
INSERT INTO `garbage` VALUES (86, '苍蝇药', 4, '油漆、废农药类');
INSERT INTO `garbage` VALUES (87, '白蚁药', 4, '油漆、废农药类');
INSERT INTO `garbage` VALUES (88, '废弃口罩', 3, '医用口罩');
INSERT INTO `garbage` VALUES (89, '干电池', 4, '电池类');
INSERT INTO `garbage` VALUES (90, '工业废水', 4, '污染水');
INSERT INTO `garbage` VALUES (92, '口罩', 3, '医用口罩');
INSERT INTO `garbage` VALUES (93, '栗子壳', 2, '坚果壳');
INSERT INTO `garbage` VALUES (94, '香蕉皮', 2, '果皮');
INSERT INTO `garbage` VALUES (95, '核桃壳', 2, '坚果壳');
INSERT INTO `garbage` VALUES (96, '虾壳', 2, '动物壳');
INSERT INTO `garbage` VALUES (97, '旧电脑', 1, '电器电子产品类');
INSERT INTO `garbage` VALUES (98, '保险柜', 1, '金属类');
INSERT INTO `garbage` VALUES (99, '电风扇', 1, '电器电子产品类');
INSERT INTO `garbage` VALUES (103, '旧鼠标', 1, '电器');
INSERT INTO `garbage` VALUES (119, '核废料', 4, '有毒有害致癌');
INSERT INTO `garbage` VALUES (120, '修改测试测试', 4, '修改测试测试');
INSERT INTO `garbage` VALUES (121, '测试修改测试', 4, '猜测修改');
INSERT INTO `garbage` VALUES (124, '苹果核', 4, '测试');
INSERT INTO `garbage` VALUES (125, 'hahah', 4, 'hahah');

-- ----------------------------
-- Table structure for garbage_classes
-- ----------------------------
DROP TABLE IF EXISTS `garbage_classes`;
CREATE TABLE `garbage_classes`  (
  `garbage_class_id` int NOT NULL AUTO_INCREMENT COMMENT '垃圾类别的id',
  `garbage_class_name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '垃圾类别的名称',
  `garbage_class_describe` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '垃圾类别的描述',
  `garbage_class_handling` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '垃圾类别的处理方式',
  `garbage_class_img_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '垃圾类别的图片地址',
  PRIMARY KEY (`garbage_class_id`) USING BTREE,
  UNIQUE INDEX `garbage_class_id`(`garbage_class_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of garbage_classes
-- ----------------------------
INSERT INTO `garbage_classes` VALUES (1, '可回收垃圾', '可回收垃圾是指适宜回收、可循环利用的生活废弃物。', '常见包括各类废弃金属、玻璃杯、易拉罐、饮料瓶、塑料玩具、书本、报纸、广告单、纸板箱、衣服、床上用品、电子产品等', '/rubbish_pic/001.jpg');
INSERT INTO `garbage_classes` VALUES (2, '厨余(湿)垃圾', '厨余垃圾是指居民日常生活及食品加工、饮食服务、单位供餐等活动中产生的垃圾。', '常见包括菜叶、剩菜、剩饭、果皮、蛋壳、茶渣、骨头等', '/rubbish_pic/002.jpg');
INSERT INTO `garbage_classes` VALUES (3, '其他(干)垃圾', '干垃圾即其它垃圾，指除可回收物、有害垃圾、厨余垃圾(湿垃圾)以外的其它生活废弃物。', '常见包括砖瓦陶瓷、渣土、卫生间废纸、猫砂、污损塑料、毛发、硬壳、一次性制品、灰土、瓷器碎片等难以回收的废弃物', '/rubbish_pic/003.jpg');
INSERT INTO `garbage_classes` VALUES (4, '有害垃圾', '有毒有害垃圾是指存有对人体健康有害的重金属、有毒的物质或者对环境造成现实危害或者潜在危害的废弃物。', '常见包括废电池、废荧光灯管、废灯泡、废水银温度计、废油漆桶、过期药品、农药、杀虫剂等。', '/rubbish_pic/004.jpg');

-- ----------------------------
-- Table structure for goods_courses
-- ----------------------------
DROP TABLE IF EXISTS `goods_courses`;
CREATE TABLE `goods_courses`  (
  `goods_course_id` int NOT NULL AUTO_INCREMENT COMMENT '商品类型的id',
  `goods_course_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品类型对应的名称',
  PRIMARY KEY (`goods_course_id`) USING BTREE,
  UNIQUE INDEX `goods_course_id`(`goods_course_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of goods_courses
-- ----------------------------

-- ----------------------------
-- Table structure for goods_details
-- ----------------------------
DROP TABLE IF EXISTS `goods_details`;
CREATE TABLE `goods_details`  (
  `details_id` int NOT NULL AUTO_INCREMENT COMMENT '详情的id',
  `details_text` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '详情的内容',
  PRIMARY KEY (`details_id`) USING BTREE,
  UNIQUE INDEX `details_id`(`details_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of goods_details
-- ----------------------------

-- ----------------------------
-- Table structure for goods_details_imgs
-- ----------------------------
DROP TABLE IF EXISTS `goods_details_imgs`;
CREATE TABLE `goods_details_imgs`  (
  `de_img_id` int NOT NULL AUTO_INCREMENT COMMENT '图片的id',
  `de_img_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '图片的url地址',
  `details_id` int NOT NULL COMMENT '图片对应的详情id',
  PRIMARY KEY (`de_img_id`) USING BTREE,
  UNIQUE INDEX `de_img_id`(`de_img_id`) USING BTREE,
  INDEX `details_id`(`details_id`) USING BTREE,
  CONSTRAINT `goods_details_imgs_ibfk_1` FOREIGN KEY (`details_id`) REFERENCES `goods_details` (`details_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of goods_details_imgs
-- ----------------------------

-- ----------------------------
-- Table structure for goods_evaluate
-- ----------------------------
DROP TABLE IF EXISTS `goods_evaluate`;
CREATE TABLE `goods_evaluate`  (
  `de_evaluate_id` int NOT NULL AUTO_INCREMENT COMMENT '评价的id',
  `de_evaluate_text` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '评价的内容',
  `client_id` int NOT NULL COMMENT '评价对应的用户id',
  PRIMARY KEY (`de_evaluate_id`) USING BTREE,
  UNIQUE INDEX `de_evaluate_id`(`de_evaluate_id`) USING BTREE,
  INDEX `client_id`(`client_id`) USING BTREE,
  CONSTRAINT `goods_evaluate_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clent_users` (`client_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of goods_evaluate
-- ----------------------------

-- ----------------------------
-- Table structure for goods_evaluate_img
-- ----------------------------
DROP TABLE IF EXISTS `goods_evaluate_img`;
CREATE TABLE `goods_evaluate_img`  (
  `goods_evaluate_img_id` int NOT NULL AUTO_INCREMENT COMMENT '商品评价对应的图片的id',
  `goods_evaluate_img_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品评价对应的图片的url地址',
  `de_evaluate_id` int NOT NULL COMMENT '图片对应的评价的id',
  PRIMARY KEY (`goods_evaluate_img_id`) USING BTREE,
  UNIQUE INDEX `goods_evaluate_img_id`(`goods_evaluate_img_id`) USING BTREE,
  INDEX `de_evaluate_id`(`de_evaluate_id`) USING BTREE,
  CONSTRAINT `goods_evaluate_img_ibfk_1` FOREIGN KEY (`de_evaluate_id`) REFERENCES `goods_evaluate` (`de_evaluate_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of goods_evaluate_img
-- ----------------------------

-- ----------------------------
-- Table structure for goods_lists
-- ----------------------------
DROP TABLE IF EXISTS `goods_lists`;
CREATE TABLE `goods_lists`  (
  `goods_id` int NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `goods_name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品名称',
  `goods_course_id` int NOT NULL COMMENT '商品类型对应的id',
  `goods_price` decimal(10, 2) NOT NULL COMMENT '商品价格',
  `goods_img_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品图片对应的url地址',
  `goods_details_id` int NULL DEFAULT NULL COMMENT '商品详情对应的id',
  `goods_evaluate_id` int NULL DEFAULT NULL COMMENT '商品评价对应的id',
  `parameter_id` int NULL DEFAULT NULL COMMENT '商品对应的规则参数id',
  `homeNametwo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品card描述',
  PRIMARY KEY (`goods_id`) USING BTREE,
  UNIQUE INDEX `goods_id`(`goods_id`) USING BTREE,
  INDEX `goods_details_id`(`goods_details_id`) USING BTREE,
  INDEX `goods_evaluate_id`(`goods_evaluate_id`) USING BTREE,
  INDEX `parameter_id`(`parameter_id`) USING BTREE,
  CONSTRAINT `goods_lists_ibfk_1` FOREIGN KEY (`goods_details_id`) REFERENCES `goods_details` (`details_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `goods_lists_ibfk_2` FOREIGN KEY (`goods_evaluate_id`) REFERENCES `goods_evaluate` (`de_evaluate_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `goods_lists_ibfk_3` FOREIGN KEY (`parameter_id`) REFERENCES `parameter` (`parameter_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of goods_lists
-- ----------------------------
INSERT INTO `goods_lists` VALUES (1, '小米8 青春版', 0, 1399.00, 'p_01.webp', NULL, NULL, NULL, '潮流镜面渐变色，自拍旗舰');
INSERT INTO `goods_lists` VALUES (2, 'X20Plus 全面屏', 0, 3498.00, 'p_02.webp', NULL, NULL, NULL, '6.43英寸大屏|0.1s快速解锁');
INSERT INTO `goods_lists` VALUES (3, 'Y69 全面屏手机', 0, 2498.00, 'p_03.webp', NULL, NULL, NULL, '前置2400万像素');
INSERT INTO `goods_lists` VALUES (4, 'Xplay6 128G版', 0, 3998.00, 'p_04.webp', NULL, NULL, NULL, '后置双摄|免费镭射镌刻');
INSERT INTO `goods_lists` VALUES (5, 'Y55 全网通', 0, 1098.00, 'p_05.webp', NULL, NULL, NULL, '大屏美颜自拍');
INSERT INTO `goods_lists` VALUES (6, 'Y66 全网通', 0, 1298.00, 'p_06.webp', NULL, NULL, NULL, '5.5英寸大屏|支持花呗分期');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `order_id` int NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `order_num` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '订单号(随机数生成)',
  `client_id` int NOT NULL COMMENT '订单对应的用户id',
  `collector_id` int NOT NULL COMMENT '订单对应的回收员id',
  `state_id` int NOT NULL COMMENT '订单对应的状态id',
  `order_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '订单开始的时间',
  `order_complete_time` timestamp(6) NULL DEFAULT NULL COMMENT '订单结束的时间',
  `w_id` int NOT NULL COMMENT '订单对应的重量范围id',
  `sort_choice_id` int NOT NULL COMMENT '订单对应的回收分类类别的id',
  `address_id` int NOT NULL COMMENT '订单对应的地址id',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '订单对应的预约地址',
  `note` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '订单对应的备注',
  PRIMARY KEY (`order_id`) USING BTREE,
  UNIQUE INDEX `order_id`(`order_id`) USING BTREE,
  UNIQUE INDEX `order_num`(`order_num`) USING BTREE,
  INDEX `client_id`(`client_id`) USING BTREE,
  INDEX `state_id`(`state_id`) USING BTREE,
  INDEX `w_id`(`w_id`) USING BTREE,
  INDEX `sort_choice_id`(`sort_choice_id`) USING BTREE,
  INDEX `collector_id`(`collector_id`) USING BTREE,
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clent_users` (`client_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`state_id`) REFERENCES `state` (`state_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`w_id`) REFERENCES `weight` (`w_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`sort_choice_id`) REFERENCES `sort_choice` (`sort_ choice_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `orders_ibfk_5` FOREIGN KEY (`collector_id`) REFERENCES `collector_users` (`collector_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES (1, 'q164380145173087614', 1, 2, 5, '2022-02-06 01:57:28.013643', '2022-01-29 16:35:22.000000', 2, 1, 14, '北京市昌平区沙河镇于辛庄村富家家园2号楼204', '测试专用备注');
INSERT INTO `orders` VALUES (6, 'u164380186185515378', 1, 2, 3, '2022-02-06 01:48:39.676358', '2022-01-29 16:38:04.000000', 3, 2, 14, '北京市昌平区富家家园2号楼204', '测试专用备注');
INSERT INTO `orders` VALUES (9, 'l164380187108582739', 1, 2, 6, '2022-02-06 01:57:41.310385', '2022-01-29 17:40:05.000000', 4, 3, 14, '北京市昌平区沙河镇于辛庄村富家家园2号楼204', '测试专用');
INSERT INTO `orders` VALUES (10, 'C164380187682968125', 1, 2, 5, '2022-02-02 19:38:01.064394', '2022-01-29 17:41:55.000000', 2, 2, 14, '北京市昌平区沙河镇于辛庄村富家家园2号楼204', '测试专用');
INSERT INTO `orders` VALUES (12, 'a164380188291806847', 1, 2, 6, '2022-02-02 19:38:07.453268', '2022-01-29 17:44:25.000000', 1, 4, 14, '北京市昌平区沙河镇于辛庄村富家家园2号楼204', '测试');
INSERT INTO `orders` VALUES (13, 'j164380188938335290', 1, 3, 7, '2022-02-02 19:38:14.160984', '2022-01-29 18:46:01.000000', 1, 5, 14, '北京市昌平区沙河镇于辛庄村富家家园2号楼204', '测试');
INSERT INTO `orders` VALUES (18, 'S164381373719743413', 1, 3, 7, '2022-02-06 00:47:36.309527', '2022-02-03 09:00:00.000000', 1, 1, 14, '北京市昌平区沙河镇于辛庄村中心街2号(村委会院内) 昌平区沙河镇于辛庄村村委会', '测试');
INSERT INTO `orders` VALUES (19, 'L164382034064527248\n      ', 1, 3, 2, '2022-02-03 00:52:16.328802', '2022-02-03 09:00:00.000000', 1, 1, 14, '北京市昌平区沙河镇于辛庄村中心街2号(村委会院内) 昌平区沙河镇于辛庄村村委会', '');
INSERT INTO `orders` VALUES (20, 'b164382042744844081\n      ', 1, 2, 5, '2022-02-06 03:38:40.415107', '2022-02-03 10:00:00.000000', 2, 2, 14, '北京市昌平区沙河镇于辛庄村中心街2号(村委会院内) 昌平区沙河镇于辛庄村村委会', '测试');
INSERT INTO `orders` VALUES (21, 'd164382052154886271\n      ', 1, 2, 2, '2022-02-03 00:52:18.600725', '2022-02-03 13:00:00.000000', 4, 5, 14, '北京市昌平区沙河镇于辛庄村中心街2号(村委会院内) 昌平区沙河镇于辛庄村村委会', '测试啊');
INSERT INTO `orders` VALUES (22, 'H164382066305241655\n      ', 1, 3, 2, '2022-02-06 00:55:12.785181', '2022-02-04 09:00:00.000000', 4, 3, 14, '北京市昌平区沙河镇于辛庄村中心街2号(村委会院内) 昌平区沙河镇于辛庄村村委会', '测试测试测试');
INSERT INTO `orders` VALUES (23, 'u164382106873557571\n      ', 1, 1, 2, '2022-02-06 00:55:13.998935', '2022-02-04 13:00:00.000000', 4, 4, 17, '北京市昌平区沙河镇于辛庄村中心街2号(村委会院内) 昌平区沙河镇于辛庄村村委会', '金属类测试');
INSERT INTO `orders` VALUES (24, 'Z164382125902893247\n      ', 2, 3, 7, '2022-02-03 01:01:30.739146', '2022-02-03 09:00:00.000000', 1, 3, 22, '北京市海淀区万寿路西路2号文博大厦2层北侧 达内北京万寿路中心\n      ', '测试');
INSERT INTO `orders` VALUES (25, 'r164382133280778131\n      ', 2, 1, 2, '2022-02-03 01:02:12.812626', '2022-02-03 09:00:00.000000', 4, 5, 22, '北京市海淀区万寿路西路2号文博大厦2层北侧 达内北京万寿路中心\n      ', '测试');
INSERT INTO `orders` VALUES (26, 'O164382201709859448\n      ', 2, 1, 2, '2022-02-03 01:13:37.108614', '2022-02-03 09:00:00.000000', 1, 3, 23, '北京市昌平区沙河镇于辛庄村中心街2号(村委会院内) 昌平区沙河镇于辛庄村村委会\n      ', '塑料测试');
INSERT INTO `orders` VALUES (27, 'J164382217938808175\n      ', 2, 3, 2, '2022-02-03 01:16:19.392743', '2022-02-05 08:00:00.000000', 4, 1, 23, '北京市昌平区沙河镇于辛庄村中心街2号(村委会院内) 昌平区沙河镇于辛庄村村委会\n      ', '衣物测试');
INSERT INTO `orders` VALUES (28, 'B164382225376529065\n      ', 2, 3, 2, '2022-02-03 01:17:33.770315', '2022-02-03 09:00:00.000000', 4, 2, 24, '北京市海淀区万寿路西路2号文博大厦2层北侧 达内北京万寿路中心\n      ', '家电测试');

-- ----------------------------
-- Table structure for parameter
-- ----------------------------
DROP TABLE IF EXISTS `parameter`;
CREATE TABLE `parameter`  (
  `parameter_id` int NOT NULL AUTO_INCREMENT COMMENT '规则参数的id',
  `parameter_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '规则参数的名称',
  `parameter_text` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '规则参数对应的内容',
  PRIMARY KEY (`parameter_id`) USING BTREE,
  UNIQUE INDEX `parameter_id`(`parameter_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of parameter
-- ----------------------------

-- ----------------------------
-- Table structure for sort_choice
-- ----------------------------
DROP TABLE IF EXISTS `sort_choice`;
CREATE TABLE `sort_choice`  (
  `sort_ choice_id` int NOT NULL AUTO_INCREMENT COMMENT '选择回收分类id',
  `sort_ choice_name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '选择回收分类种类名称',
  `sort_ choice_img_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '选择回收分类种类图片url地址',
  PRIMARY KEY (`sort_ choice_id`) USING BTREE,
  UNIQUE INDEX `sort_ choice_id`(`sort_ choice_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of sort_choice
-- ----------------------------
INSERT INTO `sort_choice` VALUES (1, '衣物', '/sort_ choice/001.jpg');
INSERT INTO `sort_choice` VALUES (2, '家电类', '/sort_ choice/002.jpg');
INSERT INTO `sort_choice` VALUES (3, '塑料类', '/sort_ choice/003.jpg');
INSERT INTO `sort_choice` VALUES (4, '金属类', '/sort_ choice/004.jpg');
INSERT INTO `sort_choice` VALUES (5, '纸类', '/sort_ choice/005.jpg');

-- ----------------------------
-- Table structure for state
-- ----------------------------
DROP TABLE IF EXISTS `state`;
CREATE TABLE `state`  (
  `state_id` int NOT NULL AUTO_INCREMENT COMMENT '状态id',
  `state_name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '状态名称',
  PRIMARY KEY (`state_id`) USING BTREE,
  UNIQUE INDEX `state_id`(`state_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of state
-- ----------------------------
INSERT INTO `state` VALUES (1, '全部');
INSERT INTO `state` VALUES (2, '待服务');
INSERT INTO `state` VALUES (3, '服务中');
INSERT INTO `state` VALUES (4, '已称重');
INSERT INTO `state` VALUES (5, '已入库');
INSERT INTO `state` VALUES (6, '入库失败');
INSERT INTO `state` VALUES (7, '已取消');

-- ----------------------------
-- Table structure for weight
-- ----------------------------
DROP TABLE IF EXISTS `weight`;
CREATE TABLE `weight`  (
  `w_id` int NOT NULL AUTO_INCREMENT COMMENT '预估重量的id',
  `w_range` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '预估重量的范围',
  PRIMARY KEY (`w_id`) USING BTREE,
  UNIQUE INDEX `w_id`(`w_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of weight
-- ----------------------------
INSERT INTO `weight` VALUES (1, '10-25kg');
INSERT INTO `weight` VALUES (2, '25-50kg');
INSERT INTO `weight` VALUES (3, '50-100kg');
INSERT INTO `weight` VALUES (4, '100kg以上');

SET FOREIGN_KEY_CHECKS = 1;
