function ncmPage( ) {
    return (
        <div>
            <h1>NCM 转换工具</h1>
            <p>支持格式.ncm</p>
            <input type="file" accept=".ncm" onChange={handleFile} />
            <br />
            <button onClick={handleUpload}>转换</button>
        </div>
    )   
}

// 获得文件，然后发送给python后端，返回mp3文件

function handleFile(e) {
    const file = e.target.files[0]
    if (file && file.name.endsWith('.ncm')) {
    }
    return file;
}

function handleUpload(){
    const file = document.querySelector('input[type="file"]').files[0];
    if (!file) {
        alert('请先选择一个.ncm文件');
        return;
    }
    sendFile(file);
}

function sendFile(file) {
    const formdata = new FormData();
    formdata.append('file', file);
    fetch('http://127.0.0.1:5000/ncm-to-mp3',{
        method:'POST',
        body:formdata
    }).then(response => response.blob()).then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'converted.mp3';
        document.body.appendChild(a);
        a.click();
        a.remove();
    }).catch(err => console.error('Error:', err));
}

export default ncmPage;
