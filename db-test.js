// 导入依赖
const mongoose = require('mongoose');
require('dotenv').config();

// 定义简单的测试数据模型
const TestSchema = new mongoose.Schema({
  test: String,
  createTime: { type: Date, default: Date.now }
});
const TestModel = mongoose.model('Test', TestSchema);

// 连接MongoDB并测试
async function testMongoDB() {
  try {
    // 连接数据库
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB 连接成功！');

    // 插入测试数据
    const testData = new TestModel({ test: '法律需求爬虫测试' });
    await testData.save();
    console.log('✅ 测试数据插入成功！');

    // 查询测试数据
    const data = await TestModel.findOne({ test: '法律需求爬虫测试' });
    console.log('✅ 查询到测试数据：', data);

  } catch (error) {
    console.error('❌ MongoDB 连接/操作失败：', error.message);
  } finally {
    // 断开连接
    await mongoose.disconnect();
    console.log('🔌 MongoDB 连接已断开');
  }
}

// 执行测试
testMongoDB();