<script lang="ts" setup>
// import TheWelcome from '../components/TheWelcome.vue'
// import { UploadProps, UploadUserFile } from 'element-plus'
import { UPLOAD_FILE_URL } from '/constant'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { MdEditor } from 'md-editor-v3'

import { getDataService } from '@/service/resumeService'

const router = useRouter()
let list = ref([])
let selectedItem = reactive({})
let resultText = ref('### 😃 Congratulations!!')
const uploadUrl = UPLOAD_FILE_URL
onMounted(() => {
  list.value = [
    {
      id: 1,
      title: 'resume1',
      text: `# 😲 resume1
Markdown Editor for Vue3, developed in jsx and typescript, support different themes、beautify content by prettier.`
    },
    {
      id: 2,
      title: 'resume2'
    },
    {
      id: 3,
      title: 'resume3'
    },
    {
      id: 4,
      title: 'resume4',
      text: `# 😲 resume4
Markdown Editor for Vue3, developed in jsx and typescript, support different themes、beautify content by prettier.`
    },
    {
      id: 5,
      title: 'resume5'
    },
    {
      id: 6,
      title: 'resume6'
    }
  ]
  // getData()
})
const getData = async () => {
  await getDataService()
}
const selectItem = (item) => {
  selectedItem = item
  router.push({ hash: `#${item.id}` })
}
const fileList = ref([
  {
    name: 'resume.pdf',
    url: ''
  },
  {
    name: 'resume1.pdf',
    url: ''
  }
])

const handleRemove = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed = (files, uploadFiles) => {
  //ElMessage.warning(
  //   `The limit is 3, you selected ${files.length} files this time, add up to ${
  //     files.length + uploadFiles.length
  //   } totally`
  // )
}

const beforeRemove = (uploadFile, uploadFiles) => {
  // return ElMessageBox.confirm(`Cancel the transfer of ${uploadFile.name} ?`).then(
  //   () => true,
  //   () => false
  // )
}
</script>

<template>
  <div class="main-container">
    <div class="con-side">
      <div v-for="item in list" :key="item.id" class="side-list" @click="selectItem(item)">
        <el-icon><Sunrise /></el-icon>
      </div>
    </div>
    <div class="con-right">
      <div class="con-body">
        <div class="con-bk">
          <el-divider content-position="left" class="title">
            <el-icon><Notebook /></el-icon> Job Requirements
          </el-divider>
          <MdEditor editorId="JREditor" v-model="selectedItem.text" />
        </div>
        <div class="con-bk">
          <el-divider content-position="left" class="title">
            <el-icon><Upload /></el-icon> Resume upload
          </el-divider>
          <el-upload
            v-model:file-list="fileList"
            class="upload-demo"
            :action="uploadUrl"
            multiple
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="3"
            :on-exceed="handleExceed"
          >
            <el-button>+ Click to upload</el-button>
            <template #tip>
              <div class="el-upload__tip" style="display: inline-block; margin-left: 15px">
                files with a size less than 500KB.
              </div>
            </template>
          </el-upload>
        </div>
        <div class="con-bk">
          <el-divider content-position="left" class="title">
            <el-icon><ChatLineSquare /></el-icon> Analyze results
          </el-divider>
          <MdEditor editorId="ResEditor" v-model="resultText" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.main-container {
  display: flex;
  height: 100%;
  .con-side {
    width: 300px;
    padding: 0 15px;
    margin: 15px 0;
    height: calc(100vh - 72px);
    box-sizing: border-box;
    overflow-y: auto;
    .side-list {
      // width: 90%;
      height: 200px;
      box-sizing: border-box;
      border: 1px solid #f5f7fa;
      background: #f5f7fa;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 15px;
      border-radius: 4px;
      font-size: 20px;
      color: #999;
      cursor: pointer;
      &:hover {
        font-size: 22px;
        box-shadow: 0 0 10px #afafaf;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .con-right {
    flex: 1;
    background: #f5f7fa;
    margin: 15px 15px 15px 0;
    padding: 15px;
    height: calc(100vh - 72px);
    overflow: hidden;
    .con-body {
      height: 100%;
      // margin: 15px 0;
      padding-right: 15px;
      overflow-y: scroll;
    }
    .con-bk {
      margin-bottom: 40px;
    }
  }
}
</style>
<style lang="scss">
.con-right {
  .title {
    border-top: 1px solid #409eff;
    margin-bottom: 30px;
    .el-divider__text {
      // font-size: 16px;
      color: #fff;
      background: #409eff;
      height: 28px;
      line-height: 28px;
      border-radius: 4px;
    }
  }
  .el-upload-list__item {
    // width: 40%;
    padding: 5px 0;
    background: #fff;
    margin-bottom: 2px;
  }
}
</style>
