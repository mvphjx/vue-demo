<template>
  <div class="date-validation-test">
    <h1>日期校验测试 (isDate)</h1>

    <div class="validator">
      <div class="section">
        <h2>日期校验</h2>
        <div class="input-group">
          <label for="dateInput">请输入日期:</label>
          <input 
            id="dateInput"
            v-model="dateInput" 
            placeholder="例如: 2023-12-25, 12/25/2023"
            @keyup.enter="validateDate"
          />
          <button @click="validateDate">校验日期</button>
        </div>
        
        <div class="result">
          <h3>校验结果:</h3>
          <div v-if="validationResult !== null" class="result-content">
            <span :class="['result-indicator', validationResult ? 'valid' : 'invalid']">
              {{ validationResult ? '✓ 有效日期' : '✗ 无效日期' }}
            </span>
            <div class="details" v-if="validationDetails">
              <p><strong>详细信息:</strong></p>
              <p>{{ validationDetails }}</p>
            </div>
          </div>
          <div v-else class="no-result">
            等待校验...
          </div>
        </div>
      </div>

      <div class="section examples">
        <h2>示例日期</h2>
        <div class="example-list">
          <div 
            v-for="(example, index) in examples" 
            :key="index" 
            class="example-item"
            @click="fillExample(example)"
          >
            {{ example }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DateUtils from '@/utils/DateUtils.js'

export default {
  name: 'DateValidationTest',
  data() {
    return {
      dateInput: '',
      validationResult: null,
      validationDetails: ''
    }
  },
  computed: {
    examples() {
      return [
        '2023-12-25',
        '12/25/2023',
        '2023-13-01',
        'Invalid Date',
        '2023-02-29',
        '2024-02-29',
        '2023-01-01T12:00:00Z',
        'not-a-date',
        new Date().toISOString(),
        ''
      ]
    }
  },
  methods: {
    validateDate() {
      try {
        // 记录输入到控制台以便调试
        console.log('正在校验日期:', this.dateInput);
        
        // 执行日期校验
        const result = DateUtils.isDate(this.dateInput);
        this.validationResult = result;
        
        // 提供详细信息
        if (result) {
          const dateObj = new Date(this.dateInput);
          this.validationDetails = `解析后的日期: ${dateObj.toString()}`;
        } else {
          this.validationDetails = '输入不是一个有效的日期格式';
        }
        
        // 输出结果到控制台
        console.log('校验结果:', result);
      } catch (error) {
        this.validationResult = false;
        this.validationDetails = `校验过程中发生错误: ${error.message}`;
        console.error('日期校验错误:', error);
      }
    },
    fillExample(example) {
      this.dateInput = example;
      this.validationResult = null;
      this.validationDetails = '';
    }
  }
}
</script>

<style scoped>
.date-validation-test {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.validator {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.section {
  flex: 1;
  min-width: 300px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
}

.section h2 {
  margin-top: 0;
  color: #333;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input-group label {
  text-align: left;
  font-weight: bold;
}

.input-group input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.input-group button {
  align-self: flex-start;
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px 0;
}

.input-group button:hover {
  background-color: #359c6d;
}

.result {
  border-top: 1px solid #eee;
  padding-top: 15px;
  margin-top: 15px;
}

.result-content {
  text-align: left;
}

.result-indicator {
  font-size: 18px;
  font-weight: bold;
}

.result-indicator.valid {
  color: #42b983;
}

.result-indicator.invalid {
  color: #e74c3c;
}

.details {
  margin-top: 10px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.no-result {
  color: #999;
  font-style: italic;
}

.examples h2 {
  margin-bottom: 15px;
}

.example-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.example-item {
  padding: 8px 12px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.example-item:hover {
  background-color: #e9ecef;
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
</style>