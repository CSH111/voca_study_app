import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas, far);

export const Spinner = () => {
  return <FontAwesomeIcon icon="fa-solid fa-circle-notch" spin />;
};

export const EllipsisIcon = () => {
  return <FontAwesomeIcon icon="fa-solid fa-ellipsis" />;
};

export const AddIcon = () => {
  return <FontAwesomeIcon icon="fa-solid fa-plus" />;
};

export const DeleteIcon = () => {
  return <FontAwesomeIcon icon="fa-solid fa-trash-can" />;
};

export const EditIcon = () => {
  return <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />;
};

export const StarIcon = () => {
  return <FontAwesomeIcon icon="fa-solid fa-star" />;
};

export const GoBackIcon = () => {
  return <FontAwesomeIcon icon="fa-solid fa-arrow-rotate-left" />;
};

export const FolderIcon = (props) => {
  return <FontAwesomeIcon icon="fa-sharp fa-solid fa-folder" {...props} />;
};

export const BookMarkIcon = (props) => {
  return <FontAwesomeIcon icon="fa-solid fa-book-bookmark" {...props} />;
};

export const CheckIcon = (props) => {
  return <FontAwesomeIcon icon="fa-solid fa-check" />;
};

export const CancelIcon = (props) => {
  return <FontAwesomeIcon icon="fa-solid fa-xmark" />;
};
