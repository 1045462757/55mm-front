//全局Api接口

//本地测试
const http = "https://127.0.0.1:8090";

//生产环境
// const http = "https://hylovecode.cn:8090"

const globalAPI = {

    /**
     * RestFul Api
     * 用户
     */
    // 登录(POST)
    LoginApi: http + '/user',

    // 注册(POST)
    RegisterApi: http + '/user/account',

    //获取用户信息(GET)
    RetrieveUserInformationApi: http + '/user/information',

    //获取其他用户信息(GET)
    RetrieveOtherUserInformationApi: http + '/user/information/others',

    //修改用户信息(PUT)
    UpdateUserInformationApi: http + '/user/information',

    //上传头像(POST)
    UpdateUserApi: http + '/user/avatar',

    //关注用户(POST)
    CreateUserCollectionApi: http + '/userCollection',

    //取消关注(DELETE)
    DeleteUserCollectionApi: http + '/userCollection',

    //找回密码(POST)
    UpdatePasswordByEmailApi: http + '/user/password',

    //修改密码(PUT)
    UpdatePasswordApi: http + '/user/password',

    //获取关注(GET)
    RetrieveFocusApi: http + '/user/focus',

    //获取粉丝(GET)
    RetrieveFansApi: http + '/user/fans',


    /**
     * Restful Api
     * 动态
     */
    //发表动态(POST)
    CreateActionApi: http + '/action',

    //删除动态(DELETE)
    DeleteActionApi: http + '/action',

    //修改动态(PUT)
    UpdateActionApi: http + '/action',

    //获取指定动态(GET)
    RetrieveActionApi: http + '/action',

    //获取动态集合(GET)
    RetrieveActionListApi: http + '/actions',

    //约拍动态(POST)
    CreateActionWatchApi: http + '/actionWatch',

    //取消约拍动态(DELETE)
    DeleteActionWatchApi: http + '/actionWatch',

    //上传图片(POST)
    CreateActionImageApi: http + '/action/image',

    //收藏动态(POST)
    CreateActionCollectionApi: http + '/actionCollection',

    //取消收藏动态(DELETE)
    DeleteActionCollectionApi: http + '/actionCollection',

    //条件查询动态
    RetrieveActionListForConditionsApi: http + '/actions/conditions',


    /**
     * Restful Api
     * 消息
     * 2019年5月23日09:04:26
     */
    //通过约拍者Id查找消息(GET)
    RetrieveMessageForWatcherApi: http + '/message/watcherId',

    //通过动态作者Id查找消息(GET)
    RetrieveMessageForActionAuthorApi: http + '/message/actionAuthorId',

    //已读消息(PUT)
    UpdateMessageIsReadApi: http + '/message/read',

    //接收约拍(PUT)
    UpdateMessageIsAcceptApi: http + '/message/accept',

    /**
     * 后台管理
     * 2019年6月20日08:50:56
     */
    GetAllUsersApi: http + "/admin/users",

    /**
     * Restful Api
     * 标签
     * 2019年7月13日10:58:53
     */
    //增加标签
    CreateTagApi: http + "/tag",

    //删除标签
    DeleteTagApi: http + "/tag"
}

export default globalAPI