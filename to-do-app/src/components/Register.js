import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import { register } from "../services/register";

export default function Register() {
    const navigate = useNavigate();
    const { onRegister } = useAuth();

    const registerHandler = async (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        const { name, username, password, rePassword } = Object.fromEntries(formData);

        let data = await register(name, username, password);
        if (username.length < 6) {
            alert('Username must be min 6 symbols!');
            return;
        }
        if (password !== rePassword) {
            alert('Passwords do not match!');
            return;
        };
        if (password.length < 6) {
            alert('Your password is weak!');
            return;
        };

        if (data.status === 200) {
            onRegister(data);
            navigate('/');
        }
    }
    return (
        <div class="container">
            <h2>Регистрация</h2>
            <form onSubmit={registerHandler}>
                <input type="text" name="name" placeholder="Име" required />
                <input type="text" name="username" placeholder="Потребителско име" required />
                <input type="password" name="password" placeholder="Парола" required />
                <input type="password" name="rePassword" placeholder="Потвърдете паролата" required />
                <button type="submit">Регистрация</button>
            </form>
            <div class="links">
                <p>Вече имате акаунт? <a href="login.html">Вход</a></p>
            </div>
        </div>
    );
}