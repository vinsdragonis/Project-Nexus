import Sidebar from '../../components/sidebar/Sidebar';
import IndividualPost from '../../components/indvidualPost/IndividualPost';
import Categories from '../../components/categories/Categories';
import './individual.css';

export default function Individual() {

    return (
        <div className="individual">
            <Categories />
            <IndividualPost />
            <Sidebar />
        </div>
    )
}
