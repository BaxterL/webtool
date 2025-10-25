import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginTest() {
    const navigate = useNavigate(); //???
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = async (e) => {
        if (!username || !password) {
        console.error('none');
        return;
        }

        console.log(username + ' and ' + password)
        try{
            const response = await fetch('http://127.0.0.1:5000/LoginTest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    other: "测试"
                })
            })
        }
        catch (error) {
            console.error('Error:', error);
        }
        const res = await response.json();

        if (res.isLogin == 0) {
            navigate('/')
        } else {
            alert(res.msg);
        }
    }

    return (
        <div>
            <h1>登录测试</h1>
            <div className="login-form">
                <label htmlFor="username">用户名:</label>
                <input type="text" id="username" value={username} onChange={handleUsernameChange}/>
                <label htmlFor="password">密码:</label>
                <input type="password" id="password" value={password} onChange={handlePasswordChange}/>
                <button type="submit" onClick={handleLogin}>登录</button>
            </div>
        </div>
    )
}

export default LoginTest;