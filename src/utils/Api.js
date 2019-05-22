//全局Api接口

//本地测试
const http = "http://127.0.0.1:8090";

//生产环境
// const http = "http://58.87.73.16:8090"

const globalAPI = {

    /**
     * RestFul Api
     * 用户
     */
    // 登录(POST)(finish)
    LoginApi: http + '/user',

    // 注册(POST)(finish)
    RegisterApi: http + '/user/account',

    //获取用户信息(GET)(finish)
    RetrieUserInformationApi: http + '/user/information',

    //获取其他用户信息(GET)(finish)
    // RetrieOtherUserInformationApi: http + '/user/information/others',

    //修改用户信息(PUT)(finish)
    UpdateUserInformationApi: http + '/user/information',

    //上传头像(POST)(finish)
    UpdateUserApi: http + '/user/avatar',

    //关注用户(POST)(finish)
    // CreateUserCollectionApi: http + '/userCollection',

    //取消关注(DELETE)(finish)
    // DeleteUserCollectionApi: http + '/userCollection',

    //找回密码(POST)(finish)
    UpdatePasswordByEmailApi: http + '/user/password',

    //修改密码(PUT)(finish)
    UpdatePasswordApi: http + '/user/password',


    /**
     * Restful Api
     * 动态
     */
    //发表动态(POST)(finish)
    CreateActionApi: http + '/action',

    //删除动态(DELETE)(finish)
    DeleteActionApi: http + '/action',

    //修改动态(PUT)(finish)
    UpdateActionApi: http + '/action',

    //获取指定动态(GET)(finish)
    RetrieActionApi: http + '/action',

    //获取动态集合(GET)(finish)
    RetrieveActionListApi: http + '/actions',

    //约拍动态(POST)(finish)
    CreateActionWatchApi: http + '/actionWatch',

    //取消约拍动态(DELETE)(finish)
    DeleteActionWatchApi: http + '/actionWatch',

    //上传图片(POST)(finish)
    CreateActionImageApi: http + '/action/image',


    /**
     * Restful Api
     * 消息
     * 2019年4月12日11:33:46
     */
    // RetrieMessageApi: http + '/message'
}

export default globalAPI