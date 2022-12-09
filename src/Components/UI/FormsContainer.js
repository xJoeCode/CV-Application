import { motion } from "framer-motion";

export default function Forms(props) {
    return (
        <motion.div layout className={props.className}>
            {props.children}
        </motion.div>
    );
}
