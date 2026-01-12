import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../lib/utils';
import { format } from 'date-fns';
import { MoreHorizontal, Mail, Phone, ExternalLink } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { cn } from '../../lib/utils';

const statusConfig = {
  new: { label: 'New', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  contacted: { label: 'Contacted', className: 'bg-amber-100 text-amber-700 border-amber-200' },
  qualified: { label: 'Qualified', className: 'bg-violet-100 text-violet-700 border-violet-200' },
  converted: { label: 'Converted', className: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  lost: { label: 'Lost', className: 'bg-slate-100 text-slate-700 border-slate-200' },
};

export default function LeadsTable({ leads = [], onStatusChange, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
            <TableHead className="font-semibold text-slate-700">Lead</TableHead>
            <TableHead className="font-semibold text-slate-700">Contact</TableHead>
            <TableHead className="font-semibold text-slate-700">Status</TableHead>
            <TableHead className="font-semibold text-slate-700">Source</TableHead>
            <TableHead className="font-semibold text-slate-700">Touch Count</TableHead>
            <TableHead className="font-semibold text-slate-700">Last Contact</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-12 text-slate-500">
                No leads found
              </TableCell>
            </TableRow>
          ) : (
            leads.map((lead) => {
              const status = statusConfig[lead.status] || statusConfig.new;
              
              return (
                <TableRow key={lead.id} className="group hover:bg-slate-50/50">
                  <TableCell>
                    <Link 
                      to={createPageUrl(`LeadDetail?id=${lead.id}`)}
                      className="flex items-center gap-3"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={lead.avatar_url} />
                        <AvatarFallback className="bg-indigo-100 text-indigo-600 font-medium">
                          {lead.name?.[0]?.toUpperCase() || '?'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {lead.name}
                        </p>
                        {lead.company && (
                          <p className="text-sm text-slate-500">{lead.company}</p>
                        )}
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        {lead.email}
                      </div>
                      {lead.phone && (
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          {lead.phone}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={cn("font-medium border", status.className)}
                    >
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-600">
                      {lead.lead_source || 'Direct'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium text-slate-900">
                      {lead.touch_count || 0}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-600">
                      {lead.last_contacted_date 
                        ? format(new Date(lead.last_contacted_date), 'MMM d, yyyy')
                        : '—'
                      }
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem asChild>
                          <Link to={createPageUrl(`LeadDetail?id=${lead.id}`)}>
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onStatusChange(lead, 'contacted')}>
                          Mark as Contacted
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onStatusChange(lead, 'qualified')}>
                          Mark as Qualified
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onStatusChange(lead, 'converted')}>
                          Mark as Converted
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => onDelete(lead)}
                          className="text-red-600 focus:text-red-600"
                        >
                          Delete Lead
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}