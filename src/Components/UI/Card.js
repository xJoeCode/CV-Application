import { motion } from "framer-motion";

export default function Card(props) {
    return (
        <motion.div layout className={props.className}>
            {props.children}
        </motion.div>
    );
}
