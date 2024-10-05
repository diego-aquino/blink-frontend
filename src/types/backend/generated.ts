// Auto-generated by zimic.
// NOTE: Do not manually edit this file. Changes will be overridden.

import type { HttpHeadersSerialized, HttpSchema, HttpSearchParamsSerialized } from 'zimic/http';

export type BlinkSchema = HttpSchema<{
  '/users': {
    /** Criar usuário */
    POST: BlinkOperations['users/create'];
  };
  '/users/me': {
    /** Buscar usuário autenticado */
    GET: BlinkOperations['users/get/me'];
  };
  '/users/:userId': {
    /** Buscar usuário */
    GET: BlinkOperations['users/get'];
    /** Remover usuário */
    DELETE: BlinkOperations['users/delete'];
    /** Atualizar usuário */
    PATCH: BlinkOperations['users/update'];
  };
  '/auth/login': {
    /** Login */
    POST: BlinkOperations['auth/login'];
  };
  '/auth/logout': {
    /** Logout */
    POST: BlinkOperations['auth/logout'];
  };
  '/auth/refresh': {
    /** Gerar novo token de acesso */
    POST: BlinkOperations['auth/refresh'];
  };
  '/auth/password': {
    /** Alterar senha */
    PUT: BlinkOperations['auth/password/update'];
  };
  '/workspaces': {
    /** Listar workspaces */
    GET: BlinkOperations['workspaces/list'];
    /** Criar workspace */
    POST: BlinkOperations['workspaces/create'];
  };
  '/workspaces/:workspaceId': {
    /** Buscar workspace */
    GET: BlinkOperations['workspaces/get'];
    /** Remover workspace */
    DELETE: BlinkOperations['workspaces/delete'];
    /** Atualizar workspace */
    PATCH: BlinkOperations['workspaces/update'];
  };
  '/workspaces/:workspaceId/members': {
    /** Listar membros */
    GET: BlinkOperations['workspaces/members/list'];
    /** Adicionar membro */
    POST: BlinkOperations['workspaces/members/create'];
  };
  '/workspaces/:workspaceId/members/:memberId': {
    /** Buscar membro */
    GET: BlinkOperations['workspaces/members/get'];
    /** Atualizar membro */
    PUT: BlinkOperations['workspaces/members/update'];
    /** Remover membro */
    DELETE: BlinkOperations['workspaces/members/delete'];
  };
  '/workspaces/:workspaceId/blinks': {
    /** Listar blinks */
    GET: BlinkOperations['workspaces/blinks/list'];
    /** Criar blink */
    POST: BlinkOperations['workspaces/blinks/create'];
  };
  '/workspaces/:workspaceId/blinks/:blinkId': {
    /** Buscar blink */
    GET: BlinkOperations['workspaces/blinks/get'];
    /** Remover blink */
    DELETE: BlinkOperations['workspaces/blinks/delete'];
    /** Atualizar blink */
    PATCH: BlinkOperations['workspaces/blinks/update'];
  };
  '/:redirectId': {
    /** Redirecionar */
    GET: BlinkOperations['redirect'];
  };
}>;

export interface BlinkComponents {
  schemas: {
    User: {
      /** @description O id do usuário */
      id: string;
      /** @description O nome do usuário */
      name: string;
      /**
       * Format: email
       * @description O email do usuário
       */
      email: string;
      /**
       * Format: date-time
       * @description A data de criação do usuário
       */
      createdAt: string;
      /**
       * Format: date-time
       * @description A data de atualização do usuário
       */
      updatedAt: string;
    };
    Workspace: {
      /** @description O id do workspace */
      id: string;
      /** @description O nome do workspace */
      name: string;
      /**
       * Format: date-time
       * @description A data de criação do workspace
       */
      createdAt: string;
      /**
       * Format: date-time
       * @description A data de atualização do workspace
       */
      updatedAt: string;
    };
    WorkspaceMember: {
      /** @description O id do membro */
      id: string;
      user: BlinkComponents['schemas']['User'];
      type: BlinkComponents['schemas']['WorkspaceMemberType'];
      /**
       * Format: date-time
       * @description A data de criação do membro
       */
      createdAt: string;
      /**
       * Format: date-time
       * @description A data de atualização do membro
       */
      updatedAt: string;
    };
    /**
     * @description O tipo do membro
     * @enum {string}
     */
    WorkspaceMemberType: 'ADMINISTRATOR' | 'DEFAULT';
    Blink: {
      /** @description O id do blink */
      id: string;
      /** @description O nome do blink */
      name: string;
      /** @description A url do blink */
      url: string;
      /** @description O id do redirecionamento */
      redirectId: string;
      /** @description O id do workspace */
      workspaceId: string;
      creator?: BlinkComponents['schemas']['User'];
      /**
       * Format: date-time
       * @description A data de criação do blink
       */
      createdAt: string;
      /**
       * Format: date-time
       * @description A data de atualização do blink
       */
      updatedAt: string;
    };
    ValidationError: {
      /** @description A mensagem de erro */
      message: string;
      /** @description Os problemas de validação */
      issues?: ({
        /** @description A mensagem de erro */
        message?: string;
        /** @description O código do erro */
        code?: string;
        /** @description O caminho do erro */
        path?: (string | number)[];
      } & {
        [key: string]: any;
      })[];
      /** @description O código do erro */
      code?: string;
    };
    AuthError: {
      /** @description A mensagem de erro */
      message: string;
      /** @description O código do erro */
      code?: string;
    };
    NotFoundError: {
      /** @description A mensagem de erro */
      message: string;
      /** @description O código do erro */
      code?: string;
    };
    ConflictError: {
      /** @description A mensagem de erro */
      message: string;
      /** @description O código do erro */
      code?: string;
    };
    InternalServerError: {
      /** @description A mensagem de erro */
      message: string;
      /** @description O código do erro */
      code?: string;
    };
  };
}

export interface BlinkOperations {
  'users/create': HttpSchema.Method<{
    request: {
      body: {
        /** @description O nome do usuário */
        name: string;
        /**
         * Format: email
         * @description O email do usuário
         */
        email: string;
        /** @description A senha do usuário */
        password: string;
      };
    };
    response: {
      /** @description Usuário criado */
      201: {
        body: BlinkComponents['schemas']['User'];
      };
      /** @description Erro de validação */
      400: {
        body: BlinkComponents['schemas']['ValidationError'];
      };
      /** @description Email em uso por outro usuário */
      409: {
        body: BlinkComponents['schemas']['ConflictError'];
      };
      /** @description Erro no servidor */
      500: {
        body: BlinkComponents['schemas']['InternalServerError'];
      };
    };
  }>;
  'users/get/me': HttpSchema.Method<{
    response: {
      /** @description Usuário encontrado */
      200: {
        body: BlinkComponents['schemas']['User'];
      };
      /** @description Não autenticado */
      401: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Usuário não encontrado */
      404: {
        body: BlinkComponents['schemas']['NotFoundError'];
      };
      /** @description Erro no servidor */
      500: {
        body: BlinkComponents['schemas']['InternalServerError'];
      };
    };
  }>;
  'users/get': HttpSchema.Method<{
    response: {
      /** @description Usuário encontrado */
      200: {
        body: BlinkComponents['schemas']['User'];
      };
      /** @description Não autenticado */
      401: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Não autorizado */
      403: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Usuário não encontrado */
      404: {
        body: BlinkComponents['schemas']['NotFoundError'];
      };
      /** @description Erro no servidor */
      500: {
        body: BlinkComponents['schemas']['InternalServerError'];
      };
    };
  }>;
  'users/delete': HttpSchema.Method<{
    response: {
      /** @description Usuário removido */
      204: {};
      /** @description Não autenticado */
      401: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Não autorizado */
      403: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Usuário não encontrado */
      404: {
        body: BlinkComponents['schemas']['NotFoundError'];
      };
      /** @description Erro no servidor */
      500: {
        body: BlinkComponents['schemas']['InternalServerError'];
      };
    };
  }>;
  'users/update': HttpSchema.Method<{
    request: {
      body: {
        /** @description O nome do usuário */
        name?: string;
        /**
         * Format: email
         * @description O email do usuário
         */
        email?: string;
      };
    };
    response: {
      /** @description Usuário atualizado */
      200: {
        body: BlinkComponents['schemas']['User'];
      };
      /** @description Erro de validação */
      400: {
        body: BlinkComponents['schemas']['ValidationError'];
      };
      /** @description Não autenticado */
      401: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Não autorizado */
      403: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Usuário não encontrado */
      404: {
        body: BlinkComponents['schemas']['NotFoundError'];
      };
      /** @description Email em uso por outro usuário */
      409: {
        body: BlinkComponents['schemas']['ConflictError'];
      };
      /** @description Erro no servidor */
      500: {
        body: BlinkComponents['schemas']['InternalServerError'];
      };
    };
  }>;
  'auth/login': HttpSchema.Method<{
    request: {
      body: {
        /**
         * Format: email
         * @description O email do usuário
         */
        email: string;
        /** @description A senha do usuário */
        password: string;
      };
    };
    response: {
      /** @description Usuário autenticado */
      204: {};
      /** @description Erro de validação */
      400: {
        body: BlinkComponents['schemas']['ValidationError'];
      };
      /** @description Credenciais inválidas */
      401: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Erro no servidor */
      500: {
        body: BlinkComponents['schemas']['InternalServerError'];
      };
    };
  }>;
  'auth/logout': HttpSchema.Method<{
    response: {
      /** @description Usuário deslogado */
      204: {};
      /** @description Não autenticado */
      401: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Erro no servidor */
      500: {
        body: BlinkComponents['schemas']['InternalServerError'];
      };
    };
  }>;
  'auth/refresh': HttpSchema.Method<{
    response: {
      /** @description Novo token de acesso gerado */
      204: {};
      /** @description Erro de validação */
      400: {
        body: BlinkComponents['schemas']['ValidationError'];
      };
      /** @description Credenciais inválidas */
      401: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Erro no servidor */
      500: {
        body: BlinkComponents['schemas']['InternalServerError'];
      };
    };
  }>;
  'auth/password/update': HttpSchema.Method<{
    request: {
      body: {
        /** @description A senha atual */
        oldPassword: string;
        /** @description A nova senha */
        newPassword: string;
      };
    };
    response: {
      /** @description Senha alterada */
      204: {};
      /** @description Erro de validação ou senha atual inválida */
      400: {
        body: BlinkComponents['schemas']['ValidationError'];
      };
      /** @description Não autenticado */
      401: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Não autorizado */
      403: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Erro no servidor */
      500: {
        body: BlinkComponents['schemas']['InternalServerError'];
      };
    };
  }>;
  'workspaces/list': HttpSchema.Method<{
    request: {
      searchParams: HttpSearchParamsSerialized<{
        /** @description O nome do workspace para filtrar */
        name?: string;
        /** @description O número da página */
        page?: number;
        /** @description O número de workspaces por página */
        limit?: number;
      }>;
    };
    response: {
      /** @description Workspaces listados */
      200: {
        body: {
          workspaces: BlinkComponents['schemas']['Workspace'][];
          /** @example 1 */
          total: number;
        };
      };
      /** @description Não autenticado */
      401: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Não autorizado */
      403: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Erro no servidor */
      500: {
        body: BlinkComponents['schemas']['InternalServerError'];
      };
    };
  }>;
  'workspaces/create': HttpSchema.Method<{
    request: {
      body: {
        /** @description O nome do workspace */
        name: string;
      };
    };
    response: {
      /** @description Workspace criado */
      201: {
        body: BlinkComponents['schemas']['Workspace'];
      };
      /** @description Erro de validação */
      400: {
        body: BlinkComponents['schemas']['ValidationError'];
      };
      /** @description Não autenticado */
      401: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Não autorizado */
      403: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Erro no servidor */
      500: {
        body: BlinkComponents['schemas']['InternalServerError'];
      };
    };
  }>;
  'workspaces/get': HttpSchema.Method<{
    response: {
      /** @description Workspace encontrado */
      200: {
        body: BlinkComponents['schemas']['Workspace'];
      };
      /** @description Não autenticado */
      401: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Não autorizado */
      403: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Workspace não encontrado */
      404: {
        body: BlinkComponents['schemas']['NotFoundError'];
      };
      /** @description Erro no servidor */
      500: {
        body: BlinkComponents['schemas']['InternalServerError'];
      };
    };
  }>;
  'workspaces/delete': HttpSchema.Method<{
    response: {
      /** @description Workspace removido */
      204: {};
      /** @description Não autenticado */
      401: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Não autorizado */
      403: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Workspace não encontrado */
      404: {
        body: BlinkComponents['schemas']['NotFoundError'];
      };
      /** @description Erro no servidor */
      500: {
        body: BlinkComponents['schemas']['InternalServerError'];
      };
    };
  }>;
  'workspaces/update': HttpSchema.Method<{
    request: {
      body: {
        /** @description O nome do workspace */
        name?: string;
      };
    };
    response: {
      /** @description Workspace atualizado */
      200: {
        body: BlinkComponents['schemas']['Workspace'];
      };
      /** @description Erro de validação */
      400: {
        body: BlinkComponents['schemas']['ValidationError'];
      };
      /** @description Não autenticado */
      401: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Não autorizado */
      403: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Workspace não encontrado */
      404: {
        body: BlinkComponents['schemas']['NotFoundError'];
      };
      /** @description Erro no servidor */
      500: {
        body: BlinkComponents['schemas']['InternalServerError'];
      };
    };
  }>;
  'workspaces/members/list': HttpSchema.Method<{
    request: {
      searchParams: HttpSearchParamsSerialized<{
        /** @description O nome do membro para filtrar */
        name?: string;
        /** @description O tipo do membro para filtrar */
        type?: BlinkComponents['schemas']['WorkspaceMemberType'];
        /** @description O número da página */
        page?: number;
        /** @description O número de membros por página */
        limit?: number;
      }>;
    };
    response: {
      /** @description Membros listados */
      200: {
        body: {
          members: BlinkComponents['schemas']['WorkspaceMember'][];
          /** @example 1 */
          total: number;
        };
      };
      /** @description Não autenticado */
      401: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Não autorizado */
      403: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Workspace não encontrado */
      404: {
        body: BlinkComponents['schemas']['NotFoundError'];
      };
      /** @description Erro no servidor */
      500: {
        body: BlinkComponents['schemas']['InternalServerError'];
      };
    };
  }>;
  'workspaces/members/create': HttpSchema.Method<{
    request: {
      body: {
        userId: string;
        type?: BlinkComponents['schemas']['WorkspaceMemberType'];
      };
    };
    response: {
      /** @description Membro adicionado */
      201: {
        body: BlinkComponents['schemas']['WorkspaceMember'];
      };
      /** @description Erro de validação */
      400: {
        body: BlinkComponents['schemas']['ValidationError'];
      };
      /** @description Não autenticado */
      401: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Não autorizado */
      403: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Workspace não encontrado */
      404: {
        body: BlinkComponents['schemas']['NotFoundError'];
      };
      /** @description Usuário já é membro do workspace */
      409: {
        body: BlinkComponents['schemas']['ConflictError'];
      };
      /** @description Erro no servidor */
      500: {
        body: BlinkComponents['schemas']['InternalServerError'];
      };
    };
  }>;
  'workspaces/members/get': HttpSchema.Method<{
    response: {
      /** @description Membro encontrado */
      200: {
        body: BlinkComponents['schemas']['WorkspaceMember'];
      };
      /** @description Não autenticado */
      401: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Não autorizado */
      403: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Membro não encontrado */
      404: {
        body: BlinkComponents['schemas']['NotFoundError'];
      };
      /** @description Erro no servidor */
      500: {
        body: BlinkComponents['schemas']['InternalServerError'];
      };
    };
  }>;
  'workspaces/members/update': HttpSchema.Method<{
    request: {
      body: {
        type?: BlinkComponents['schemas']['WorkspaceMemberType'];
      };
    };
    response: {
      /** @description Membro atualizado */
      200: {
        body: BlinkComponents['schemas']['WorkspaceMember'];
      };
      /** @description Erro de validação */
      400: {
        body: BlinkComponents['schemas']['ValidationError'];
      };
      /** @description Não autenticado */
      401: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Não autorizado */
      403: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Membro não encontrado */
      404: {
        body: BlinkComponents['schemas']['NotFoundError'];
      };
      /** @description Erro no servidor */
      500: {
        body: BlinkComponents['schemas']['InternalServerError'];
      };
    };
  }>;
  'workspaces/members/delete': HttpSchema.Method<{
    response: {
      /** @description Membro removido */
      204: {};
      /** @description Não autenticado */
      401: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Não autorizado */
      403: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Membro não encontrado */
      404: {
        body: BlinkComponents['schemas']['NotFoundError'];
      };
      /** @description Erro no servidor */
      500: {
        body: BlinkComponents['schemas']['InternalServerError'];
      };
    };
  }>;
  'workspaces/blinks/list': HttpSchema.Method<{
    request: {
      searchParams: HttpSearchParamsSerialized<{
        /** @description O nome do blink para filtrar */
        name?: string;
        /** @description O número da página */
        page?: number;
        /** @description O número de blinks por página */
        limit?: number;
      }>;
    };
    response: {
      /** @description Blinks listados */
      200: {
        body: {
          blinks: BlinkComponents['schemas']['Blink'][];
          /** @example 1 */
          total: number;
        };
      };
      /** @description Não autenticado */
      401: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Não autorizado */
      403: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Workspace não encontrado */
      404: {
        body: BlinkComponents['schemas']['NotFoundError'];
      };
      /** @description Erro no servidor */
      500: {
        body: BlinkComponents['schemas']['InternalServerError'];
      };
    };
  }>;
  'workspaces/blinks/create': HttpSchema.Method<{
    request: {
      body: {
        /** @description O nome do blink */
        name: string;
        /** @description A url do blink */
        url: string;
        /** @description O id do redirecionamento (se não fornecido, será gerado automaticamente) */
        redirectId?: string;
      };
    };
    response: {
      /** @description Blink criado */
      201: {
        body: BlinkComponents['schemas']['Blink'];
      };
      /** @description Erro de validação */
      400: {
        body: BlinkComponents['schemas']['ValidationError'];
      };
      /** @description Não autenticado */
      401: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Não autorizado */
      403: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Workspace não encontrado */
      404: {
        body: BlinkComponents['schemas']['NotFoundError'];
      };
      /** @description Id de redirecionamento em uso por outro blink */
      409: {
        body: BlinkComponents['schemas']['ConflictError'];
      };
      /** @description Erro no servidor */
      500: {
        body: BlinkComponents['schemas']['InternalServerError'];
      };
    };
  }>;
  'workspaces/blinks/get': HttpSchema.Method<{
    response: {
      /** @description Blink encontrado */
      200: {
        body: BlinkComponents['schemas']['Blink'];
      };
      /** @description Não autenticado */
      401: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Não autorizado */
      403: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Workspace ou blink não encontrados */
      404: {
        body: BlinkComponents['schemas']['NotFoundError'];
      };
      /** @description Erro no servidor */
      500: {
        body: BlinkComponents['schemas']['InternalServerError'];
      };
    };
  }>;
  'workspaces/blinks/delete': HttpSchema.Method<{
    response: {
      /** @description Blink removido */
      204: {};
      /** @description Não autenticado */
      401: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Não autorizado */
      403: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Blink não encontrado */
      404: {
        body: BlinkComponents['schemas']['NotFoundError'];
      };
      /** @description Erro no servidor */
      500: {
        body: BlinkComponents['schemas']['InternalServerError'];
      };
    };
  }>;
  'workspaces/blinks/update': HttpSchema.Method<{
    request: {
      body: {
        /** @description O nome do blink */
        name?: string;
        /** @description A url do blink */
        url?: string;
        /** @description O id do redirecionamento */
        redirectId?: string;
      };
    };
    response: {
      /** @description Blink atualizado */
      200: {
        body: BlinkComponents['schemas']['Blink'];
      };
      /** @description Erro de validação */
      400: {
        body: BlinkComponents['schemas']['ValidationError'];
      };
      /** @description Não autenticado */
      401: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Não autorizado */
      403: {
        body: BlinkComponents['schemas']['AuthError'];
      };
      /** @description Blink não encontrado */
      404: {
        body: BlinkComponents['schemas']['NotFoundError'];
      };
      /** @description Id de redirecionamento em uso por outro blink */
      409: {
        body: BlinkComponents['schemas']['ConflictError'];
      };
      /** @description Erro no servidor */
      500: {
        body: BlinkComponents['schemas']['InternalServerError'];
      };
    };
  }>;
  redirect: HttpSchema.Method<{
    response: {
      /** @description Redirecionamento */
      308: {
        headers: HttpHeadersSerialized<{
          location?: string;
          'cache-control'?: string;
        }>;
      };
      /** @description Redirecionamento não encontrado */
      404: {
        body: BlinkComponents['schemas']['NotFoundError'];
      };
      /** @description Erro no servidor */
      500: {
        body: BlinkComponents['schemas']['InternalServerError'];
      };
    };
  }>;
}
