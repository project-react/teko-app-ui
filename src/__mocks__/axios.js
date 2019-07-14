const user = {
    1: {
      name: "nguyenduychien", 
      age: "20"
    }, 
    2: {
      name: "nguyenvanchien", 
      age: "19"
    }
  }
export default {
  get: jest.fn((url) => Promise.resolve({ 
    data: user
  })) 
  ,
  getById: jest.fn((url,id) => Promise.resolve({
    data: user[id]
  })), 
  post: jest.fn((url ,data) => Promise.resolve({
    data: { results: data }
  }))
}; 
  