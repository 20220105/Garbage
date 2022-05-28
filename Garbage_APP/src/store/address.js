function deepCopy(source, target){
  for(let key in source){
    if(source.hasOwnProperty(key)){
      if(source[key] && typeof source[key] === 'object'){
        target[key] = source[key].constructor === 'Array' ? [] : {}
        deepCopy(source[key],target[key])
      }else{
        target[key] = source[key]
      }
    }
  }
}

export default {
  namespaced: true,
  state:{
    address:[],
    currentSelectId: '-1' //当前选中的地址ID
  },
  mutations:{
    pushAddress(state,payload){ //添加地址
      let temp = {}
      deepCopy(payload,temp)
      if(temp.isDefault){
        state.address.forEach(val=>{
          if(val.isDefault)
            val.isDefault = false
        })
      }
      let existIndex = state.address.findIndex(val=>val.id === temp.id)
      if(existIndex !== -1){ //若修改已经存在的项，则保存
        for(let key in temp){
          state.address[existIndex][key] = temp[key]
        }
      }else{ //否则在末尾插入新项
        if(state.address.length > 0) //判断原地址列表是否为空
          temp.id = state.address.length
        else
          temp.id = 0
        state.address.push(temp)
      }
      if(state.currentSelectId === '-1' && temp.isDefault){
        state.currentSelectId = temp.id
      }
      console.log(state.address)
    },
    removeAddress(state,id){ //移除地址
      state.address = state.address.filter(val=>val.id !== id)
      let count = 0;
      state.address.forEach(val=>{
        val.id = count;
        ++count;
      })
      if(state.address.length === 0)
        state.currentSelectId = '-1'
      console.log(state.address)
    },
    changeSelection(state,id){ //修改当前选择的ID
      state.currentSelectId = id
    }
  }
}