import React from "react";
import AdminSideBar from "./layouts/AdminSideBar";
import AdminFooter from "./layouts/AdminFooter";
import AdminHeader from "./layouts/AdminHeader";
import PerformanceChart from "../components/PerformanceChart"; // Adapte le chemin si nécessaire

export default function Dashboard() {
  return (
    <>
      <AdminHeader /> {/* Un-comment AdminHeader */}
      <AdminSideBar />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">

            {/* Titre principal du dashboard */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="page-title mb-0">Tableau de Bord du Chimiste Médicinal</h2>
                <p className="text-muted">Vue d'ensemble de vos activités moléculaires</p>
              </div>
            </div>

            {/* Cartes de Statistiques */}
            <div className="row">
              {[
                {
                  icon: "la-flask",
                  title: "Molécules soumises",
                  value: "124",
                  color: "warning",
                },
                {
                  icon: "la-line-chart",
                  title: "Affinités prédites",
                  value: "89",
                  color: "success",
                },
                {
                  icon: "la-lightbulb-o",
                  title: "Optimisations proposées",
                  value: "37",
                  color: "danger",
                },
                {
                  icon: "la-database",
                  title: "Fragments disponibles",
                  value: "12.4k",
                  color: "primary",
                },
              ].map((stat, index) => (
                <div className="col-md-3" key={index}>
                  <div
                    className={`card bg-${stat.color} text-white border-0 shadow-sm rounded-lg transition-card`}
                    style={{ cursor: "pointer", transition: "transform 0.2s ease-in-out" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  >
                    <div className="card-body">
                      <div className="row">
                        <div className="col-4 text-center d-flex align-items-center justify-content-center">
                          <i className={`la ${stat.icon} la-2x`}></i>
                        </div>
                        <div className="col-8 d-flex flex-column justify-content-center">
                          <p className="card-category mb-1">{stat.title}</p>
                          <h4 className="card-title mb-0">{stat.value}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Graphique de performance */}
            <div className="row mt-4">
              <div className="col-md-12">
                <div className="card p-4 mb-4">
                  <PerformanceChart />
                </div>
              </div>
            </div>

            {/* Soumissions récentes & Suggestions d'optimisation */}
            <div className="row">
              {/* Soumissions récentes */}
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Soumissions Récentes</h4>
                    <p className="card-category">Structures moléculaires</p>
                  </div>
                  <div className="card-body">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Nom</th>
                          <th>Date</th>
                          <th>État</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Ligand-X23</td>
                          <td>03/05/2025</td>
                          <td><span className="badge badge-success">Prédite</span></td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Inhibiteur-MZ1</td>
                          <td>02/05/2025</td>
                          <td><span className="badge badge-warning">En cours</span></td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Antagoniste-KB8</td>
                          <td>01/05/2025</td>
                          <td><span className="badge badge-danger">Échec</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Suggestions d’optimisation */}
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Suggestions d’Optimisation</h4>
                    <p className="card-category">Améliorations moléculaires recommandées</p>
                  </div>
                  <div className="card-body">
                    <ul className="list-group">
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Ajouter un groupe méthyle en position R2
                        <span className="badge badge-primary badge-pill">Ligand-X23</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Remplacer cycle aromatique par noyau pyridazine
                        <span className="badge badge-primary badge-pill">Inhibiteur-MZ1</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Ajouter hétéroatome dans la chaîne latérale
                        <span className="badge badge-primary badge-pill">Antagoniste-KB8</span>
                      </li>
                    </ul>
                  </div>
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
