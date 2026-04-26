'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Grant public read access to all public content types on boot.
    // This lets the frontend fetch news/partidos/eventos/jugadores/sponsors
    // without having to configure roles manually in the admin UI.
    try {
      const publicRole = await strapi
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'public' } });

      if (!publicRole) return;

      const publicContentTypes = [
        'api::noticia.noticia',
        'api::partido.partido',
        'api::evento.evento',
        'api::jugador.jugador',
        'api::sponsor.sponsor',
        'api::directivo.directivo',
      ];

      const actionsToGrant = ['find', 'findOne'];

      for (const uid of publicContentTypes) {
        for (const action of actionsToGrant) {
          const actionId = `${uid}.${action}`;
          const existing = await strapi
            .query('plugin::users-permissions.permission')
            .findOne({ where: { action: actionId, role: publicRole.id } });

          if (!existing) {
            await strapi.query('plugin::users-permissions.permission').create({
              data: {
                action: actionId,
                role: publicRole.id,
              },
            });
          }
        }
      }
    } catch (err) {
      strapi.log.warn('[bootstrap] could not grant public permissions: ' + err.message);
    }
  },
};
