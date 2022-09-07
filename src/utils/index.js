const exportFileFun = (res, name) => {
    //  导出文件
    if (res.type !== 'octets/stream') {
        throw new Error('导出失败:' + res.message);
    } else {
        let blob = new Blob([res]); //构造一个blob对象来处理数据
        let fileName = name + '.xls';
        if ('download' in document.createElement('a')) {
            //支持a标签download的浏览器
            let link = document.createElement('a'); //创建a标签
            link.download = fileName; //a标签添加属性
            link.style.display = 'none';
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.click(); //执行下载
            URL.revokeObjectURL(link.href); //释放url
            document.body.removeChild(link); //释放标签
        } else {
            //其他浏览器
            navigator.msSaveBlob(blob, fileName);
        }
    }
};
export { exportFileFun };