import React from "react";
import AdminHeader from "./layouts/AdminHeader";
import AdminSideBar from "./layouts/AdminSideBar";
import AdminFooter from "./layouts/AdminFooter";

export default function Dashboard(props) {
  return (
    <>
      <AdminHeader />
      <AdminSideBar />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h4 className="page-title">Dashboard</h4>
            <div className="row">
              <div className="col-md-3">
                <div className="card card-stats card-warning">
                  <div className="card-body ">
                    <div className="row">
                      <div className="col-5">
                        <div className="icon-big text-center">
                          <i className="la la-users"></i>
                        </div>
                      </div>
                      <div className="col-7 d-flex align-items-center">
                        <div className="numbers">
                          <p className="card-category">Nombre de chimistes inscrits</p>
                          <h4 className="card-title">4</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card card-stats card-success">
                  <div className="card-body ">
                    <div className="row">
                      <div className="col-5">
                        <div className="icon-big text-center">
                          <i className="la la-bar-chart"></i>
                        </div>
                      </div>
                      <div className="col-7 d-flex align-items-center">
                        <div className="numbers">
                          <p className="card-category">Nombre de médicaments soumises</p>
                          <h4 className="card-title">3</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card card-stats card-danger">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-5">
                        <div className="icon-big text-center">
                          <i className="la la-newspaper-o"></i>
                        </div>
                      </div>
                      <div className="col-7 d-flex align-items-center">
                        <div className="numbers">
                          <p className="card-category">Expériences traitées</p>
                          <h4 className="card-title">2</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card card-stats card-primary">
                  <div className="card-body ">
                    <div className="row">
                      <div className="col-5">
                        <div className="icon-big text-center">
                          <i className="la la-check-circle"></i>
                        </div>
                      </div>
                      <div className="col-7 d-flex align-items-center">
                        <div className="numbers">
                          <p className="card-category">Résultats Completes</p>
                          <h4 className="card-title">1</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row row-card-no-pd">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <p className="fw-bold mt-1">Budget disponible </p>
                    <h4>
                      <b>$ 3,018</b>
                    </h4>
                    <a href="#" className="btn btn-primary btn-full text-left mt-3 mb-3">
                      <i className="la la-plus"></i> Demender un budget
                    </a>
                  </div>
                  <div className="card-footer">
                    <ul className="nav">
                      <li className="nav-item">
                        <a className="btn btn-default btn-link" href="#">
                          <i className="la la-history"></i> Histoire
                        </a>
                      </li>
                      <li className="nav-item ml-auto">
                        <a className="btn btn-default btn-link" href="#">
                          <i className="la la-refresh"></i> Refresh
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="card">
                  <div className="card-body">
                    <div className="progress-card">
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-muted">Test Accuracy</span>
                        <span className="text-muted fw-bold"> 90.1%</span>
                      </div>
                      <div className="progress mb-2" style={{ height: "7px" }}>
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{ width: "90.1%" }}
                          aria-valuenow="90.1"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="90.1%"></div>
                      </div>
                    </div>
                    <div className="progress-card">
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-muted">Tests approuvés</span>
                        <span className="text-muted fw-bold"> 50%</span>
                      </div>
                      <div className="progress mb-2" style={{ height: "7px" }}>
                        <div
                          className="progress-bar bg-info"
                          role="progressbar"
                          style={{ width: "50%" }}
                          aria-valuenow="50"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="50%"></div>
                      </div>
                    </div>
                    <div className="progress-card">
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-muted">Disponibilité des Équipements </span>
                        <span className="text-muted fw-bold"> 70%</span>
                      </div>
                      <div className="progress mb-2" style={{ height: "7px" }}>
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width: "70%" }}
                          aria-valuenow="70"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="70%"></div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card card-stats">
                  <div className="card-body">
                    <p className="fw-bold mt-1">Statistique</p>
                    <div className="row">
                      <div className="col-5">
                        <div className="icon-big text-center icon-warning">
                          <i className="la la-thermometer-half text-primary"></i> {/* Changed icon to thermometer */}
                        </div>
                      </div>
                    <div className="col-7 d-flex align-items-center">
                      <div className="numbers">
                        <p className="card-category">Température du réfrigérateur</p> {/* Changed category */}
                        <h4 className="card-title">
                          <span className="text-success">4.2°C</span> {/* Real-time temp reading */}
                          <small className="text-muted">/ 2-8°C</small> {/* Target range */}
                        </h4>
                        <div className="status-badge">
                          <span className="badge badge-success">Stable</span> {/* Status indicator */}
                        </div>
                      </div>
                   </div>
                </div>
                    <hr />
                    <div className="row">
                      <div className="col-5">
                        <div className="icon-big text-center">
                          <i className="la la-flask text-primary"></i>
                        </div>
                      </div>
                      <div className="col-7 d-flex align-items-center">
                        <div className="numbers">
                          <p className="card-category">Nouveaux Collaborateurs</p>
                          <h4 className="card-title">+2</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header ">
                    <h4 className="card-title">Table</h4>
                    <p className="card-category">Remarque à écrire</p>
                  </div>
                  <div className="card-body">
                    <table className="table table-head-bg-success table-striped table-hover">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Type</th>
                          <th scope="col">Explication</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>CNA </td>
                          <td>Y/N</td>
                          <td>les modifications du nombre de copies d’un gène dans le génome</td>
                        </tr>
                        <tr>
                          <td>Expression Génétique</td>
                          <td>Y/N</td>
                          <td>les niveaux d’activité des gènes dans les lignées cellulaires cancéreuses</td>
                        </tr>
                        <tr>
                          <td>Méthylation </td>
                          <td>Y/N</td>
                          <td>Modifications épigénétiques qui régulent l’expression des gènes sans altérer la séquence ADN</td>
                        </tr>
                        
                        <tr>
                          <td>TARGET et TARGET_PATHWAY </td>
                          <td>Ecrire une phrase</td>
                          <td>Indiquent les gènes ou voies spécifiques ciblés par les médicaments testés</td>
                        </tr>
                        <tr>
                          <td>MSI - Microsatellite Instability Status </td>
                          <td>Ecrire une phrase</td>
                          <td> la présence de mutations dans des séquences ADN répétitives</td>
                        </tr>
                        <tr>
                          <td>Milieu de Culture  </td>
                          <td>Ecrire une phrase</td>
                          <td> Décrire les conditions de culture des lignées cellulaires lors du criblage des médicaments</td>
                        </tr>
                        <tr>
                          <td>Propriétés de Croissance </td>
                          <td>Ecrire une phrase</td>
                          <td>Décrire les caractéristiques de prolifération des lignées cellulaires</td>
                        </tr>
                        <tr>
                          <td>Aire Sous la Courbe </td>
                          <td>Numéro</td>
                          <td>Mesurer la réponse globale au médicament</td>
                        </tr>
                        <tr>
                          <td>Z_SCORE </td>
                          <td>Numéro</td>
                          <td>indiquer combien d’écarts-types une valeur se situe par rapport à la moyenne</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card card-tasks">
                  <div className="card-header ">
                    <h4 className="card-title">Procédures de Laboratoire</h4>
                    <p className="card-category">Workflow Expérimental</p>
                  </div>
                  <div className="card-body ">
                    <div className="table-full-width">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input
                                    className="form-check-input  select-all-checkbox"
                                    type="checkbox"
                                    data-select="checkbox"
                                    data-target=".task-select"
                                  />
                                  <span className="form-check-sign"></span>
                                </label>
                              </div>
                            </th>
                            <th>Task</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input className="form-check-input task-select" type="checkbox" />
                                  <span className="form-check-sign"></span>
                                </label>
                              </div>
                            </td>
                            <td>choisir un médicament soumit</td>
                            <td className="td-actions text-right">
                              <div className="form-button-action">
                                <button
                                  type="button"
                                  data-toggle="tooltip"
                                  title="Edit Task"
                                  className="btn btn-link <btn-simple-primary">
                                  <i className="la la-edit"></i>
                                </button>
                                <button
                                  type="button"
                                  data-toggle="tooltip"
                                  title="Remove"
                                  className="btn btn-link btn-simple-danger">
                                  <i className="la la-times"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input className="form-check-input task-select" type="checkbox" />
                                  <span className="form-check-sign"></span>
                                </label>
                              </div>
                            </td>
                            <td>faire une expérience dans le labo</td>
                            <td className="td-actions text-right">
                              <div className="form-button-action">
                                <button
                                  type="button"
                                  data-toggle="tooltip"
                                  title="Edit Task"
                                  className="btn btn-link <btn-simple-primary">
                                  <i className="la la-edit"></i>
                                </button>
                                <button
                                  type="button"
                                  data-toggle="tooltip"
                                  title="Remove"
                                  className="btn btn-link btn-simple-danger">
                                  <i className="la la-times"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input className="form-check-input task-select" type="checkbox" />
                                  <span className="form-check-sign"></span>
                                </label>
                              </div>
                            </td>
                            <td>écrire les remarques</td>
                            <td className="td-actions text-right">
                              <div className="form-button-action">
                                <button
                                  type="button"
                                  data-toggle="tooltip"
                                  title="Edit Task"
                                  className="btn btn-link <btn-simple-primary">
                                  <i className="la la-edit"></i>
                                </button>
                                <button
                                  type="button"
                                  data-toggle="tooltip"
                                  title="Remove"
                                  className="btn btn-link btn-simple-danger">
                                  <i className="la la-times"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input className="form-check-input task-select" type="checkbox" />
                                  <span className="form-check-sign"></span>
                                </label>
                              </div>
                            </td>
                            <td>soumettre et envoyer au chimiste</td>
                            <td className="td-actions text-right">
                              <div className="form-button-action">
                                <button
                                  type="button"
                                  data-toggle="tooltip"
                                  title="Edit Task"
                                  className="btn btn-link <btn-simple-primary">
                                  <i className="la la-edit"></i>
                                </button>
                                <button
                                  type="button"
                                  data-toggle="tooltip"
                                  title="Remove"
                                  className="btn btn-link btn-simple-danger">
                                  <i className="la la-times"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="card-footer ">
                    <div className="stats">
                      <i className="la la-history"></i> Dernière mise à jour: {new Date().toLocaleTimeString()}
                    </div>
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
