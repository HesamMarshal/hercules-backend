import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class CategoryEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  image: string;
}
