export const router = {

    // publicrouter -- chưa login user
    home: "/",
    login: "/login",
    register: "/register",
    changepassword: "/changepassword/:id",
    resetpassword : "/passwordreset/reset/:token",
    updateUser: "/updateuser",

    // privateRoute -- login user mới vào được
    searchTour : "/tours/search",
    tagTour : "/tours/tag/:tag",
    addTour: "/addTour",
    editTour: "/editTour/:id",
    singleTour: "/tour/:id",
    dasboard: "/dashboard",

    
    inforCompany: "/inforCompany",

    // privateRoute có phân quyền ADMIN (làm thêm vào cuối project)

    //URL không tồn tại
    notFound: "*",
}   