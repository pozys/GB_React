import axios from "axios"
import { withLogger } from "./logger"

class Request {
  constructor() {
    this.request = withLogger(
      axios.create({
        baseURL: "http://localhost:8000",
        timeout: 1000,
      }),
    )
  }

  get = (url) => {
    return this.request.get(url)
  }

  post = (url, data) => {
    return this.request.post(url, data, {})
  }

  put = (url, data) => {
    return this.request.put(url, data, {})
  }

  delete = (url, data) => {
    return this.request.delete(url, {})
  }
}

export const axiosProvider = new Request()
