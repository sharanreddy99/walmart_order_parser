"""Create Tables Migration

Revision ID: 14cce766fb97
Revises: 91e5fe76a5b6
Create Date: 2023-12-16 17:36:56.520845

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '14cce766fb97'
down_revision = '91e5fe76a5b6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('walmart_order', schema=None) as batch_op:
        batch_op.add_column(sa.Column('deliveryFee', sa.Float(), nullable=False))
        batch_op.add_column(sa.Column('savings', sa.Float(), nullable=False))
        batch_op.add_column(sa.Column('subTotal', sa.Float(), nullable=False))
        batch_op.add_column(sa.Column('tax', sa.Float(), nullable=False))
        batch_op.add_column(sa.Column('tip', sa.Float(), nullable=False))
        batch_op.add_column(sa.Column('total', sa.Float(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('walmart_order', schema=None) as batch_op:
        batch_op.drop_column('total')
        batch_op.drop_column('tip')
        batch_op.drop_column('tax')
        batch_op.drop_column('subTotal')
        batch_op.drop_column('savings')
        batch_op.drop_column('deliveryFee')

    # ### end Alembic commands ###
