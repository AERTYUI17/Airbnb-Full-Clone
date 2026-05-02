
import Image from 'next/image';

const Logo = () => {
    return (
        <Image 
            src="/logo-ajir.png" 
            alt="Ajir Logo" 
            width={102} 
            height={32}
            priority
        />
    );
}

export default Logo;
