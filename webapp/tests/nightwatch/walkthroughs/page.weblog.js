export default {  
  url: 'https://localhost:3000/weblog',
  commands: [{  
  post(title, text, image, labels) {
    return this
     //.stuff()
  },
  edit(title, text, image, labels) {
    return this
     //.stuff()
  },
  search(string) {
    return this
     //.stuff()
  },
  remove(postId) {
    return this
     //.stuff()
  },
  filterByLabel(postId) {
    return this
     //.stuff()
  }
}],
  elements: {
    titleInput: {
      selector: 'input[type=text]'
    },
    textInput: {
      selector: 'input[name=password]'
    },
    imageUrlInput: {
      selector: 'input[name=imageUrl]'
    }
  }
};