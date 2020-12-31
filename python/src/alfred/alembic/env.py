#@PydevCodeAnalysisIgnore
from __future__ import with_statement

from logging.config import fileConfig

from alembic import context
from sqlalchemy import engine_from_config, pool
from sqlalchemy.engine.base import Engine
from lbc.model.category import Category
from lbc.model.prospect import Prospect
from lbc.database import Base, engine

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config  # @UndefinedVariable

# Interpret the config file for Python logging.
# This line sets up loggers basically.
fileConfig(config.config_file_name)

# add your model's MetaData object here
# for 'autogenerate' support
# from myapp import mymodel
# target_metadata = mymodel.Base.metadata

target_metadata = Base.metadata

# other values from the config, defined by the needs of env.py,
# can be acquired:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.


def exclude_tables_from_config(config_):
    tables_ = config_.get("tables", None)
    if tables_ is not None:
        tables = tables_.split(",")
    return tables


exclude_tables = exclude_tables_from_config(
    config.get_section('alembic:exclude'))


def include_object(object_, name, type_, reflected, compare_to):
    if type_ == "table" and name in exclude_tables:
        return False
    else:
        return True


def run_migrations_offline():
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    # url = config.get_main_option("sqlalchemy.url")
    # @UndefinedVariable
    context.configure(url=engine.url, include_object=include_object)

    with context.begin_transaction():  # @UndefinedVariable
        context.run_migrations()  # @UndefinedVariable


def run_migrations_online():
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    if isinstance(engine, Engine):
        connection = engine.connect()
    else:
        raise Exception(
            'Expected engine instance got %s instead' % type(engine))

    context.configure(  # @UndefinedVariable
        connection=connection,
        target_metadata=target_metadata,
        include_object=include_object
    )

    try:
        with context.begin_transaction():  # @UndefinedVariable
            context.run_migrations()  # @UndefinedVariable
    finally:
        connection.close()


if context.is_offline_mode():  # @UndefinedVariable
    run_migrations_offline()
else:
    run_migrations_online()
