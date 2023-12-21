export default function Button ({ children, onClick, isActive }) {
    let classes = 'button';
    return <button className={classes} onClick={onClick}>{children}</button>;
}
