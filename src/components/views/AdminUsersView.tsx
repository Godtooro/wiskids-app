import React, { useState } from 'react';
import { Users, UserPlus, Edit2, Trash2, Shield, GraduationCap, X, Check, Key, AlertTriangle } from 'lucide-react';
import { UserAccount, UserRole } from '../../types/auth';
import { authService } from '../../services/authService';
import { soundService } from '../../services/soundService';

interface AdminUsersViewProps {
  currentUser: UserAccount;
  onBack: () => void;
}

export const AdminUsersView: React.FC<AdminUsersViewProps> = ({ currentUser, onBack }) => {
  const [users, setUsers] = useState<UserAccount[]>(authService.getUsers());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserAccount | null>(null);

  // Form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [avatar, setAvatar] = useState('🦁');
  const [formError, setFormError] = useState('');

  const refreshUsers = () => {
    setUsers(authService.getUsers());
  };

  const handleOpenCreate = () => {
    soundService.playTap();
    setUsername('');
    setPassword('');
    setName('');
    setRole('student');
    setAvatar('🦁');
    setFormError('');
    setShowCreateModal(true);
  };

  const handleOpenEdit = (user: UserAccount) => {
    soundService.playTap();
    setEditingUser(user);
    setUsername(user.username);
    setPassword(user.password);
    setName(user.name);
    setRole(user.role);
    setAvatar(user.avatar);
    setFormError('');
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const res = authService.createUser({
      username,
      password,
      name: name.trim() || username,
      role,
      avatar
    });

    if (res.success) {
      soundService.playCorrect();
      refreshUsers();
      setShowCreateModal(false);
    } else {
      soundService.playWrong();
      setFormError(res.error || 'Error al crear usuario.');
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setFormError('');

    const res = authService.updateUser(editingUser.id, {
      username,
      password,
      name: name.trim() || username,
      role,
      avatar
    });

    if (res.success) {
      soundService.playCorrect();
      refreshUsers();
      setEditingUser(null);
    } else {
      soundService.playWrong();
      setFormError(res.error || 'Error al actualizar usuario.');
    }
  };

  const handleDeleteUser = (user: UserAccount) => {
    soundService.playTap();
    if (user.username.toLowerCase() === 'godtooro') {
      alert('La cuenta principal de administrador no puede ser eliminada.');
      return;
    }

    if (
      window.confirm(
        `¿Estás seguro de que deseas eliminar el usuario "${user.name}" (${user.username})?`
      )
    ) {
      const res = authService.deleteUser(user.id);
      if (res.success) {
        soundService.playCorrect();
        refreshUsers();
      } else {
        soundService.playWrong();
        alert(res.error || 'No se pudo eliminar el usuario.');
      }
    }
  };

  const avatarsList = ['🦁', '👑', '🚀', '🦊', '🦉', '⭐', '🦖', '🦄', '⚽', '🎨'];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-3xl">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800">
              Gestión de Usuarios (Administración)
            </h1>
            <p className="text-xs sm:text-sm font-bold text-slate-500">
              Crea, modifica contraseñas y administra perfiles de alumnos y educadores
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleOpenCreate}
            className="touch-target px-5 h-12 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold flex items-center gap-2 shadow-md shadow-emerald-200 active:scale-95 transition-all"
          >
            <UserPlus className="w-5 h-5 stroke-[2.5]" />
            <span>Crear Usuario</span>
          </button>

          <button
            type="button"
            onClick={onBack}
            className="touch-target px-5 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold active:scale-95 transition-all"
          >
            Volver a la App
          </button>
        </div>
      </div>

      {/* Users List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {users.map((u) => {
          const isCurrent = u.id === currentUser.id;
          const isAdmin = u.role === 'admin';

          return (
            <div
              key={u.id}
              className={`bg-white rounded-3xl p-6 border-2 shadow-sm flex flex-col justify-between transition-all ${
                isAdmin ? 'border-indigo-200 ring-2 ring-indigo-50' : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 border-2 border-slate-200 flex items-center justify-center text-4xl shadow-inner">
                    {u.avatar || '🦁'}
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`text-xs font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1 ${
                        isAdmin
                          ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {isAdmin ? <Shield className="w-3.5 h-3.5" /> : <GraduationCap className="w-3.5 h-3.5" />}
                      {isAdmin ? 'Administrador' : 'Estudiante'}
                    </span>

                    {isCurrent && (
                      <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                        Tu sesión actual
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-black text-xl text-slate-800">{u.name}</h3>
                <div className="flex items-center gap-2 mt-1 text-xs font-bold text-slate-500">
                  <span>Usuario: <strong className="text-slate-700 font-mono">{u.username}</strong></span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs font-bold text-slate-500">
                  <span>Contraseña: <strong className="text-slate-700 font-mono bg-slate-100 px-1.5 py-0.5 rounded">{u.password}</strong></span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(u)}
                  className="p-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs flex items-center gap-1.5 active:scale-95 transition-all"
                  title="Modificar usuario"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Modificar</span>
                </button>

                {u.username.toLowerCase() !== 'godtooro' && (
                  <button
                    type="button"
                    onClick={() => handleDeleteUser(u)}
                    className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs flex items-center gap-1.5 active:scale-95 transition-all"
                    title="Eliminar usuario"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Eliminar</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Crear Usuario */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border-2 border-slate-200 shadow-2xl animate-pop">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-black text-slate-800">Crear Nuevo Usuario</h2>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-black text-slate-600 uppercase">Nombre visible</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Lucas o María"
                  className="w-full h-12 px-4 rounded-xl border border-slate-300 font-bold text-slate-800 focus:outline-none focus:border-sky-500 mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-600 uppercase">Usuario (Login)</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ej. lucas2026"
                  className="w-full h-12 px-4 rounded-xl border border-slate-300 font-bold text-slate-800 focus:outline-none focus:border-sky-500 mt-1"
                  autoCapitalize="none"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-600 uppercase">Contraseña</label>
                <input
                  type="text"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña del usuario"
                  className="w-full h-12 px-4 rounded-xl border border-slate-300 font-mono font-bold text-slate-800 focus:outline-none focus:border-sky-500 mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-600 uppercase">Rol</label>
                <div className="grid grid-cols-2 gap-3 mt-1">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`h-12 rounded-xl font-bold text-sm border-2 transition-all ${
                      role === 'student'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-200'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Estudiante
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`h-12 rounded-xl font-bold text-sm border-2 transition-all ${
                      role === 'admin'
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-800 ring-2 ring-indigo-200'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Administrador
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-slate-600 uppercase">Avatar</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {avatarsList.map((em) => (
                    <button
                      key={em}
                      type="button"
                      onClick={() => setAvatar(em)}
                      className={`w-11 h-11 rounded-xl text-2xl border-2 flex items-center justify-center transition-transform ${
                        avatar === em
                          ? 'border-sky-500 bg-sky-50 scale-110 shadow-sm'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>

              {formError && (
                <div className="bg-rose-50 text-rose-700 p-2.5 rounded-xl text-xs font-bold border border-rose-200">
                  {formError}
                </div>
              )}

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="touch-target flex-1 h-12 rounded-xl font-bold bg-slate-100 text-slate-600 active:scale-95"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="touch-target flex-1 h-12 rounded-xl font-black bg-emerald-500 hover:bg-emerald-600 text-white shadow-md active:scale-95"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Modificar Usuario */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border-2 border-slate-200 shadow-2xl animate-pop">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-black text-slate-800">Modificar Usuario</h2>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="p-2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-black text-slate-600 uppercase">Nombre</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-slate-300 font-bold text-slate-800 focus:outline-none focus:border-sky-500 mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-600 uppercase">Usuario (Login)</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={editingUser.username.toLowerCase() === 'godtooro'}
                  className="w-full h-12 px-4 rounded-xl border border-slate-300 font-bold text-slate-800 focus:outline-none focus:border-sky-500 mt-1 disabled:bg-slate-100 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-600 uppercase">Contraseña</label>
                <input
                  type="text"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-slate-300 font-mono font-bold text-slate-800 focus:outline-none focus:border-sky-500 mt-1"
                />
              </div>

              {editingUser.username.toLowerCase() !== 'godtooro' && (
                <div>
                  <label className="text-xs font-black text-slate-600 uppercase">Rol</label>
                  <div className="grid grid-cols-2 gap-3 mt-1">
                    <button
                      type="button"
                      onClick={() => setRole('student')}
                      className={`h-12 rounded-xl font-bold text-sm border-2 transition-all ${
                        role === 'student'
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-200'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      Estudiante
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('admin')}
                      className={`h-12 rounded-xl font-bold text-sm border-2 transition-all ${
                        role === 'admin'
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-800 ring-2 ring-indigo-200'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      Administrador
                    </button>
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-black text-slate-600 uppercase">Avatar</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {avatarsList.map((em) => (
                    <button
                      key={em}
                      type="button"
                      onClick={() => setAvatar(em)}
                      className={`w-11 h-11 rounded-xl text-2xl border-2 flex items-center justify-center transition-transform ${
                        avatar === em
                          ? 'border-sky-500 bg-sky-50 scale-110 shadow-sm'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>

              {formError && (
                <div className="bg-rose-50 text-rose-700 p-2.5 rounded-xl text-xs font-bold border border-rose-200">
                  {formError}
                </div>
              )}

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="touch-target flex-1 h-12 rounded-xl font-bold bg-slate-100 text-slate-600 active:scale-95"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="touch-target flex-1 h-12 rounded-xl font-black bg-sky-500 hover:bg-sky-600 text-white shadow-md active:scale-95"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
