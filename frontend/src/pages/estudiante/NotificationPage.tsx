import { useEffect, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IconBell, IconCheck, IconClock, IconAlertCircle } from '@tabler/icons-react';
import { notificationService } from '../../services/notificationService';
import type { NotificacionItem } from '../../types/estudianteTypes';

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function NotificationPage() {
  const queryClient = useQueryClient();
  const hasMarkedAsReadRef = useRef(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notificaciones'],
    queryFn: notificationService.getNotificaciones,
  });

  const markReadMutation = useMutation({
    mutationFn: (id: string) => notificationService.markNotificacionLeida(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notificaciones'] });
    },
  });

  useEffect(() => {
    if (!data || hasMarkedAsReadRef.current) {
      return;
    }

    const unreadNotifications = data.notificaciones.filter((item) => !item.leida);
    if (unreadNotifications.length === 0) {
      return;
    }

    hasMarkedAsReadRef.current = true;

    const markAllAsRead = async () => {
      for (const notification of unreadNotifications) {
        await markReadMutation.mutateAsync(notification.id);
      }
    };

    markAllAsRead();
  }, [data]);

  const notifications: NotificacionItem[] = data?.notificaciones ?? [];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-secondary)' }}
          >
            <IconBell size={28} style={{ color: 'white' }} />
          </div>
          <div>
            <h1 style={{ color: 'var(--color-primary)' }}>Notificaciones</h1>
            <p style={{ color: 'var(--color-gray-medium)' }} className="mt-2">
              Aquí se muestran tus notificaciones recientes. Las nuevas se marcarán como leídas al ingresar.
            </p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="p-6 rounded-2xl bg-white shadow-sm">
          <p style={{ color: 'var(--color-gray-medium)' }}>Cargando notificaciones...</p>
        </div>
      ) : isError ? (
        <div className="p-6 rounded-2xl bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <IconAlertCircle size={24} style={{ color: 'var(--color-error)' }} />
            <p style={{ color: 'var(--color-text)' }}>
              No se pudieron cargar las notificaciones. Intenta de nuevo más tarde.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-5 rounded-2xl bg-white border" style={{ borderColor: 'var(--color-border)' }}>
              <p className="text-sm" style={{ color: 'var(--color-gray-medium)' }}>
                Total de notificaciones
              </p>
              <p className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
                {data?.totalNotificaciones ?? 0}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border" style={{ borderColor: 'var(--color-border)' }}>
              <p className="text-sm" style={{ color: 'var(--color-gray-medium)' }}>
                No leídas
              </p>
              <p className="text-3xl font-bold" style={{ color: 'var(--color-danger)' }}>
                {data?.noLeidas ?? 0}
              </p>
            </div>
          </div>

          {notifications.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white shadow-sm text-center">
              <p style={{ color: 'var(--color-gray-medium)' }}>
                No tienes notificaciones por el momento.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-6 rounded-2xl bg-white border"
                  style={{ borderColor: notification.leida ? 'var(--color-border)' : 'var(--color-primary)' }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold" style={{ color: 'var(--color-text)' }}>
                        {notification.mensaje}
                      </p>
                      <p className="text-xs mt-2" style={{ color: 'var(--color-gray-medium)' }}>
                        {formatDate(notification.fechaCreacion)}
                      </p>
                    </div>
                    {notification.leida ? (
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold"
                        style={{ backgroundColor: '#E5F6EA', color: 'var(--color-success)' }}
                      >
                        <IconCheck size={14} /> Leída
                      </span>
                    ) : (
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold"
                        style={{ backgroundColor: '#FEF3C7', color: 'var(--color-warning)' }}
                      >
                        <IconClock size={14} /> Nueva
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
