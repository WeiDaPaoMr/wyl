import request from "../utils/request"

const getlist = (page, size, data = {}) => {
    return request({
        url: `/member/list/search/${page}/${size}`,
        method: "POST",
        data
    })
}

export default {
    getlist
}