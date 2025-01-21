const base = {
    get() {
        return {
            url : "http://localhost:8080/springboot3zeu5/",
            name: "springboot3zeu5",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/springboot3zeu5/front/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "土家风景文化管理平台"
        } 
    }
}
export default base
