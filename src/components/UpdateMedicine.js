import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
// ✅ Correct (matches the file name)
import AdminSideBar from "./layouts/AdminSideBar";
import AdminFooter from "./layouts/AdminFooter";
import { db } from "../firebase";
import { collection, doc, updateDoc, getDocs } from "firebase/firestore";

export default function UpdateMolecules() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [medTypes, setMedTypes] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [Molecules, setMolecules] = useState(
    JSON.parse(localStorage.getItem("Molecules_obj")) || {}
  );

  const fetchCategories = async () => {
    const snapshot = await getDocs(collection(db, "Molecules_categories"));
    setCategories(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const fetchTypes = async () => {
    const snapshot = await getDocs(collection(db, "Molecules_types"));
    setMedTypes(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchCategories();
    fetchTypes();
  }, []);

  const handleUpdateMolecules = async () => {
    const { name, power, category, type, id } = Molecules;

    if (name && power && category && type ) {
      try {
        const medRef = doc(db, "Molecules_inventory", id);
        await updateDoc(medRef, Molecules);
        setSuccessMsg("Medicine updated successfully!");
        setErrorMsg("");
        setTimeout(() => {
          navigate("/inventory");
        }, 1200);
      } catch (err) {
        console.error(err);
        setErrorMsg("Update failed. Please try again.");
      }
    } else {
      setErrorMsg("Please fill out all required fields.");
    }
  };

  return (
    <>
      <AdminSideBar />
      <div className="main-panel" style={{ marginLeft: 250 }}>
        <div className="content">
          <div className="container-fluid">
            <h4 className="page-title">Modifier une Molecules</h4>
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Modifier les détails d'une Molecules</h5>
                <Link to="/inventory" className="btn btn-sm btn-danger">
                  Retour
                </Link>
              </div>
              <div className="card-body px-4">
                <div className="form-group">
                  <label htmlFor="name">Nom du Molecules</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={Molecules.name}
                    onChange={(e) => setMolecules({ ...Molecules, name: e.target.value })}
                    placeholder="Entrer le nom"
                  />
                </div>

                

                <div className="form-group">
                  <label>Catégorie</label>
                  <select
                    className="form-control"
                    value={Molecules.category}
                    onChange={(e) => setMolecules({ ...Molecules, category: e.target.value })}
                  >
                    <option value="">Choisir une catégorie...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Type</label>
                  <select
                    className="form-control"
                    value={Molecules.type}
                    onChange={(e) => setMolecules({ ...Molecules, type: e.target.value })}
                  >
                    <option value="">Choisir un type...</option>
                    {medTypes.map((type) => (
                      <option key={type.id} value={type.name}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

               
              

                <div className="text-center text-danger">{errorMsg}</div>
                <div className="text-center text-success">{successMsg}</div>

                <div className="form-group text-center mt-3">
                  <button className="btn btn-success" onClick={handleUpdateMolecules}>
                    Enregistrer les modifications
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </>
  );
}
