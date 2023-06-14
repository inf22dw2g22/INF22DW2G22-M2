import { Routes, Route } from 'react-router-dom';

import { List, AddEdit, View } from '.';

export { FaturasLayout };

function FaturasLayout() {
    return (
        <div className="p-4">
            <div className="container">
                <Routes>
                    <Route index element={<List />} />
                    <Route path="add" element={<AddEdit />} />
                    <Route path="edit/:id" element={<AddEdit />} />
                    <Route path="view/:id" element={<View/>} />
                </Routes>
            </div>
        </div>
    );
}
