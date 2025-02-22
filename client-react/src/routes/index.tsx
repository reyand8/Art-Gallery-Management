import { Route, Routes } from 'react-router-dom';

import NotFound from '../pages/NotFound';
import Home from '../pages/Home';


const AppRoutes = () => (
    <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default AppRoutes;