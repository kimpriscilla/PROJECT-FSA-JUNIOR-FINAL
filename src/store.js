import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios";

const LOAD_CAMPUSES = "LOAD_CAMPUSES";
const UNREGISTER_STUDENT = "UNREGISTER_STUDENT";

//------- action creators
function loadCampuses(campus) {
  return {
    type: "LOAD_CAMPUSES",
    payload: campus,
  };
}

function loadStudents(student) {
  return {
    type: "LOAD_STUDENTS",
    payload: student,
  };
}

function deleteCampus(id) {
  return {
    type: "DELETE_CAMPUS",
    payload: id,
  };
}

function deleteStudent(id) {
  return {
    type: "DELETE_STUDENT",
    payload: id,
  };
}

function addCampus(campus) {
  return {
    type: "ADD_CAMPUS",
    payload: campus,
  };
}

function addStudent(student) {
  return {
    type: "ADD_STUDENT",
    payload: student,
  };
}

function editCampus(campus) {
  return {
    type: "EDIT_CAMPUS",
    payload: campus,
  };
}

function editStudent(student) {
  return {
    type: "EDIT_STUDENT",
    payload: student,
  };
}

function unregisterId(student) {
  return {
    type: UNREGISTER_STUDENT,
    student,
  };
}
//-------thunks

export const _loadCampuses = () => {
  return async (dispatch) => {
    const campus = (await axios.get("/api/campuses")).data;
    dispatch(loadCampuses(campus));
  };
};

export const _loadStudents = () => {
  return async (dispatch) => {
    const student = (await axios.get("/api/students")).data;
    dispatch(loadStudents(student));
  };
};

//---- delete thunks
export const _deleteCampus = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/campuses/${id}`);
    dispatch(deleteCampus(id));
  };
};

export const _deleteStudent = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/students/${id}`);
    dispatch(deleteStudent(id));
  };
};

//-------- form thunks

export const _addCampus = (campus) => {
  return async (dispatch) => {
    const newCampus = (await axios.post("/api/campuses", campus)).data;
    dispatch(addCampus(newCampus));
  };
};

export const _addStudents = (student) => {
  return async (dispatch) => {
    const newStudent = (await axios.post("/api/students", student)).data;
    dispatch(addStudent(newStudent));
  };
};

//------- update thunks

export const _editCampus = (id, campus) => {
  return async (dispatch) => {
    const updateCampus = (await axios.put(`/api/campuses/${id}`, campus)).data;
    dispatch(editCampus(updateCampus));
  };
};

export const _editStudent = (id, student) => {
  return async (dispatch) => {
    const updateStudent = (await axios.put(`/api/students/${id}`, student))
      .data;

    dispatch(editStudent(updateStudent));
  };
};

export const _unregisterId = (student) => {
  return async (dispatch) => {
    student.campusId = null;
    const updatedStudent = (
      await axios.put(`/api/students/${student.id}`, student)
    ).data;
    dispatch(unregisterId(updatedStudent));
  };
};

const initialState = {
  campuses: [],
  students: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CAMPUSES:
      return {
        ...state,
        campuses: action.payload,
      };
    case "LOAD_STUDENTS":
      return {
        ...state,
        students: action.payload,
      };

    case "DELETE_CAMPUS":
      return {
        ...state,
        campuses: state.campuses.filter((campus) => {
          return campus.id !== action.payload;
        }),
      };
    case "DELETE_STUDENT":
      return {
        ...state,
        students: state.students.filter((student) => {
          return student.id !== action.payload;
        }),
      };
    case "ADD_CAMPUS":
      return {
        ...state,
        campuses: [...state.campuses, action.payload],
      };
    case "ADD_STUDENT":
      return {
        ...state,
        students: [...state.students, action.payload],
      };
    case "EDIT_CAMPUS":
      return {
        ...state,

        campuses: state.campuses.map((campus) => {
          if (campus.id === action.payload.id) {
            return action.payload;
          }
          return campus;
        }),
      };

    case "EDIT_STUDENT":
      return {
        ...state,
        students: state.students.map((student) => {
          if (student.id === action.payload.id) {
            action.payload.campusId = action.payload.campusId * 1;
            return action.payload;
          }
          return student;
        }),
      };
    case UNREGISTER_STUDENT:
      return {
        ...state,
        students: state.students.map((student) => {
          if (student.id === action.student.id) {
            return action.student;
          }
          return student;
        }),
      };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
