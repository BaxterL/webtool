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

function handleFile(e) {
    const file = e.target.files[0]
    if (file && file.name.endsWith('.ncm')) {
        
    }
}

function handleUpload(){
    
}


export default ncmPage;
